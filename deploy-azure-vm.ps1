# Azure VM Deployment Script for E-commerce Application
param(
    [Parameter(Mandatory = $true)]
    [string]$ResourceGroupName,
    
    [Parameter(Mandatory = $true)]
    [string]$Location,
    
    [Parameter(Mandatory = $true)]
    [string]$VMName,
    
    [Parameter(Mandatory = $true)]
    [string]$AdminUsername,
    
    [Parameter(Mandatory = $true)]
    [SecureString]$AdminPassword
)

# Login to Azure (uncomment if not already logged in)
# Connect-AzAccount

# Create Resource Group
New-AzResourceGroup -Name $ResourceGroupName -Location $Location

# Create Virtual Network
$SubnetConfig = New-AzVirtualNetworkSubnetConfig `
    -Name "ecommerce-subnet" `
    -AddressPrefix "10.0.1.0/24"

$Vnet = New-AzVirtualNetwork `
    -ResourceGroupName $ResourceGroupName `
    -Location $Location `
    -Name "ecommerce-vnet" `
    -AddressPrefix "10.0.0.0/16" `
    -Subnet $SubnetConfig

# Create Public IP
$PublicIP = New-AzPublicIpAddress `
    -ResourceGroupName $ResourceGroupName `
    -Location $Location `
    -AllocationMethod Static `
    -Name "ecommerce-ip"

# Create Network Security Group
$NSGRuleSSH = New-AzNetworkSecurityRuleConfig `
    -Name "SSH" `
    -Protocol Tcp `
    -Direction Inbound `
    -Priority 1000 `
    -SourceAddressPrefix * `
    -SourcePortRange * `
    -DestinationAddressPrefix * `
    -DestinationPortRange 22 `
    -Access Allow

$NSGRuleHTTP = New-AzNetworkSecurityRuleConfig `
    -Name "HTTP" `
    -Protocol Tcp `
    -Direction Inbound `
    -Priority 1001 `
    -SourceAddressPrefix * `
    -SourcePortRange * `
    -DestinationAddressPrefix * `
    -DestinationPortRange 80 `
    -Access Allow

$NSGRuleHTTPS = New-AzNetworkSecurityRuleConfig `
    -Name "HTTPS" `
    -Protocol Tcp `
    -Direction Inbound `
    -Priority 1002 `
    -SourceAddressPrefix * `
    -SourcePortRange * `
    -DestinationAddressPrefix * `
    -DestinationPortRange 443 `
    -Access Allow

$NSG = New-AzNetworkSecurityGroup `
    -ResourceGroupName $ResourceGroupName `
    -Location $Location `
    -Name "ecommerce-nsg" `
    -SecurityRules $NSGRuleSSH, $NSGRuleHTTP, $NSGRuleHTTPS

# Create Network Interface
$NIC = New-AzNetworkInterface `
    -Name "ecommerce-nic" `
    -ResourceGroupName $ResourceGroupName `
    -Location $Location `
    -SubnetId $Vnet.Subnets[0].Id `
    -PublicIpAddressId $PublicIP.Id `
    -NetworkSecurityGroupId $NSG.Id

# Create VM Configuration
$VMConfig = New-AzVMConfig -VMName $VMName -VMSize "Standard_D2s_v3"
$VMConfig = Set-AzVMOperatingSystem `
    -VM $VMConfig `
    -Linux `
    -ComputerName $VMName `
    -Credential (New-Object PSCredential ($AdminUsername, $AdminPassword))

$VMConfig = Set-AzVMSourceImage `
    -VM $VMConfig `
    -PublisherName "Canonical" `
    -Offer "UbuntuServer" `
    -Skus "20.04-LTS" `
    -Version "latest"

$VMConfig = Add-AzVMNetworkInterface -VM $VMConfig -Id $NIC.Id

# Create VM
New-AzVM `
    -ResourceGroupName $ResourceGroupName `
    -Location $Location `
    -VM $VMConfig

Write-Host "VM deployment completed. Public IP:" (Get-AzPublicIpAddress -ResourceGroupName $ResourceGroupName -Name "ecommerce-ip").IpAddress
