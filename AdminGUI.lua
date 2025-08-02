-- Apple-Inspired Admin GUI for Roblox
-- Created with modern UI principles and smooth animations

local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")
local UserInputService = game:GetService("UserInputService")
local RunService = game:GetService("RunService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local StarterGui = game:GetService("StarterGui")

local LocalPlayer = Players.LocalPlayer
local PlayerGui = LocalPlayer:WaitForChild("PlayerGui")

-- Admin Configuration
local ADMIN_USERS = {
    [LocalPlayer.UserId] = true, -- Add your user ID here
    -- Add more admin user IDs as needed
}

-- Check if player is admin
local function isAdmin(player)
    return ADMIN_USERS[player.UserId] or false
end

-- Only create GUI for admins
if not isAdmin(LocalPlayer) then
    return
end

-- Apple Design Constants
local COLORS = {
    PRIMARY = Color3.fromRGB(255, 255, 255),
    SECONDARY = Color3.fromRGB(242, 242, 247),
    ACCENT = Color3.fromRGB(0, 122, 255),
    DESTRUCTIVE = Color3.fromRGB(255, 59, 48),
    SUCCESS = Color3.fromRGB(52, 199, 89),
    WARNING = Color3.fromRGB(255, 149, 0),
    BACKGROUND = Color3.fromRGB(28, 28, 30),
    CARD = Color3.fromRGB(44, 44, 46),
    TEXT = Color3.fromRGB(255, 255, 255),
    SECONDARY_TEXT = Color3.fromRGB(152, 152, 157)
}

local ANIMATIONS = {
    SPRING = TweenInfo.new(0.6, Enum.EasingStyle.Back, Enum.EasingDirection.Out),
    SMOOTH = TweenInfo.new(0.3, Enum.EasingStyle.Quart, Enum.EasingDirection.Out),
    FAST = TweenInfo.new(0.15, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)
}

-- Create main ScreenGui
local AdminGui = Instance.new("ScreenGui")
AdminGui.Name = "AppleAdminGUI"
AdminGui.ResetOnSpawn = false
AdminGui.IgnoreGuiInset = true
AdminGui.Parent = PlayerGui

-- Blur Effect
local BlurEffect = Instance.new("BlurEffect")
BlurEffect.Size = 0
BlurEffect.Parent = game.Workspace.CurrentCamera

-- Main Container with Blur Background
local MainFrame = Instance.new("Frame")
MainFrame.Name = "MainFrame"
MainFrame.Size = UDim2.new(0, 800, 0, 600)
MainFrame.Position = UDim2.new(0.5, -400, 0.5, -300)
MainFrame.BackgroundColor3 = COLORS.BACKGROUND
MainFrame.BackgroundTransparency = 0.1
MainFrame.BorderSizePixel = 0
MainFrame.Visible = false
MainFrame.Parent = AdminGui

-- Add corner radius
local MainCorner = Instance.new("UICorner")
MainCorner.CornerRadius = UDim.new(0, 20)
MainCorner.Parent = MainFrame

-- Add subtle shadow
local Shadow = Instance.new("ImageLabel")
Shadow.Name = "Shadow"
Shadow.Size = UDim2.new(1, 20, 1, 20)
Shadow.Position = UDim2.new(0, -10, 0, -10)
Shadow.BackgroundTransparency = 1
Shadow.Image = "rbxasset://textures/ui/GuiImagePlaceholder.png"
Shadow.ImageColor3 = Color3.fromRGB(0, 0, 0)
Shadow.ImageTransparency = 0.8
Shadow.ZIndex = -1
Shadow.Parent = MainFrame

-- Title Bar
local TitleBar = Instance.new("Frame")
TitleBar.Name = "TitleBar"
TitleBar.Size = UDim2.new(1, 0, 0, 60)
TitleBar.Position = UDim2.new(0, 0, 0, 0)
TitleBar.BackgroundColor3 = COLORS.CARD
TitleBar.BackgroundTransparency = 0.2
TitleBar.BorderSizePixel = 0
TitleBar.Parent = MainFrame

local TitleCorner = Instance.new("UICorner")
TitleCorner.CornerRadius = UDim.new(0, 20)
TitleCorner.Parent = TitleBar

-- Title Text
local TitleText = Instance.new("TextLabel")
TitleText.Name = "TitleText"
TitleText.Size = UDim2.new(1, -120, 1, 0)
TitleText.Position = UDim2.new(0, 20, 0, 0)
TitleText.BackgroundTransparency = 1
TitleText.Text = "Apple Admin"
TitleText.TextColor3 = COLORS.TEXT
TitleText.TextSize = 24
TitleText.Font = Enum.Font.GothamBold
TitleText.TextXAlignment = Enum.TextXAlignment.Left
TitleText.Parent = TitleBar

-- Close Button
local CloseButton = Instance.new("TextButton")
CloseButton.Name = "CloseButton"
CloseButton.Size = UDim2.new(0, 40, 0, 40)
CloseButton.Position = UDim2.new(1, -50, 0, 10)
CloseButton.BackgroundColor3 = COLORS.DESTRUCTIVE
CloseButton.Text = "X"
CloseButton.TextColor3 = COLORS.PRIMARY
CloseButton.TextSize = 18
CloseButton.Font = Enum.Font.GothamBold
CloseButton.BorderSizePixel = 0
CloseButton.Parent = TitleBar

local CloseCorner = Instance.new("UICorner")
CloseCorner.CornerRadius = UDim.new(0, 20)
CloseCorner.Parent = CloseButton

-- Content Container
local ContentFrame = Instance.new("Frame")
ContentFrame.Name = "ContentFrame"
ContentFrame.Size = UDim2.new(1, 0, 1, -60)
ContentFrame.Position = UDim2.new(0, 0, 0, 60)
ContentFrame.BackgroundTransparency = 1
ContentFrame.Parent = MainFrame

-- Navigation
local NavFrame = Instance.new("Frame")
NavFrame.Name = "Navigation"
NavFrame.Size = UDim2.new(0, 200, 1, 0)
NavFrame.Position = UDim2.new(0, 0, 0, 0)
NavFrame.BackgroundColor3 = COLORS.CARD
NavFrame.BackgroundTransparency = 0.3
NavFrame.BorderSizePixel = 0
NavFrame.Parent = ContentFrame

local NavCorner = Instance.new("UICorner")
NavCorner.CornerRadius = UDim.new(0, 16)
NavCorner.Parent = NavFrame

-- Navigation Buttons Container
local NavContainer = Instance.new("ScrollingFrame")
NavContainer.Name = "NavContainer"
NavContainer.Size = UDim2.new(1, -20, 1, -20)
NavContainer.Position = UDim2.new(0, 10, 0, 10)
NavContainer.BackgroundTransparency = 1
NavContainer.BorderSizePixel = 0
NavContainer.ScrollBarThickness = 4
NavContainer.ScrollBarImageColor3 = COLORS.ACCENT
NavContainer.CanvasSize = UDim2.new(0, 0, 0, 0)
NavContainer.Parent = NavFrame

local NavLayout = Instance.new("UIListLayout")
NavLayout.SortOrder = Enum.SortOrder.LayoutOrder
NavLayout.Padding = UDim.new(0, 8)
NavLayout.Parent = NavContainer

-- Main Content Area
local MainContent = Instance.new("Frame")
MainContent.Name = "MainContent"
MainContent.Size = UDim2.new(1, -220, 1, 0)
MainContent.Position = UDim2.new(0, 210, 0, 0)
MainContent.BackgroundTransparency = 1
MainContent.Parent = ContentFrame

-- Pages Container
local PagesContainer = Instance.new("Frame")
PagesContainer.Name = "PagesContainer"
PagesContainer.Size = UDim2.new(1, 0, 1, 0)
PagesContainer.BackgroundTransparency = 1
PagesContainer.Parent = MainContent

-- Live Event System
local LiveEvents = {}
local EventConnections = {}

-- Player Management Data
local PlayerData = {}
local BannedPlayers = {}
local WarnedPlayers = {}

-- Create Navigation Button
local function createNavButton(text, layoutOrder, callback)
    local Button = Instance.new("TextButton")
    Button.Name = text .. "Button"
    Button.Size = UDim2.new(1, 0, 0, 45)
    Button.BackgroundColor3 = COLORS.SECONDARY
    Button.BackgroundTransparency = 0.8
    Button.Text = ""
    Button.BorderSizePixel = 0
    Button.LayoutOrder = layoutOrder
    Button.Parent = NavContainer
    
    local ButtonCorner = Instance.new("UICorner")
    ButtonCorner.CornerRadius = UDim.new(0, 12)
    ButtonCorner.Parent = Button
    
    local TextLabel = Instance.new("TextLabel")
    TextLabel.Name = "Text"
    TextLabel.Size = UDim2.new(1, -30, 1, 0)
    TextLabel.Position = UDim2.new(0, 15, 0, 0)
    TextLabel.BackgroundTransparency = 1
    TextLabel.Text = text
    TextLabel.TextColor3 = COLORS.TEXT
    TextLabel.TextSize = 16
    TextLabel.Font = Enum.Font.Gotham
    TextLabel.TextXAlignment = Enum.TextXAlignment.Left
    TextLabel.Parent = Button
    
    -- Hover Animation
    Button.MouseEnter:Connect(function()
        TweenService:Create(Button, ANIMATIONS.FAST, {BackgroundTransparency = 0.6}):Play()
        TweenService:Create(TextLabel, ANIMATIONS.FAST, {TextColor3 = COLORS.ACCENT}):Play()
    end)
    
    Button.MouseLeave:Connect(function()
        TweenService:Create(Button, ANIMATIONS.FAST, {BackgroundTransparency = 0.8}):Play()
        TweenService:Create(TextLabel, ANIMATIONS.FAST, {TextColor3 = COLORS.TEXT}):Play()
    end)
    
    -- Click Animation
    Button.MouseButton1Click:Connect(function()
        TweenService:Create(Button, ANIMATIONS.FAST, {Size = UDim2.new(0.95, 0, 0, 43)}):Play()
        wait(0.1)
        TweenService:Create(Button, ANIMATIONS.FAST, {Size = UDim2.new(1, 0, 0, 45)}):Play()
        if callback then callback() end
    end)
    
    return Button
end

-- Create Page Function
local function createPage(name)
    local Page = Instance.new("ScrollingFrame")
    Page.Name = name .. "Page"
    Page.Size = UDim2.new(1, 0, 1, 0)
    Page.BackgroundTransparency = 1
    Page.BorderSizePixel = 0
    Page.ScrollBarThickness = 6
    Page.ScrollBarImageColor3 = COLORS.ACCENT
    Page.CanvasSize = UDim2.new(0, 0, 0, 0)
    Page.Visible = false
    Page.Parent = PagesContainer
    
    local PageLayout = Instance.new("UIListLayout")
    PageLayout.SortOrder = Enum.SortOrder.LayoutOrder
    PageLayout.Padding = UDim.new(0, 15)
    PageLayout.Parent = Page
    
    local PagePadding = Instance.new("UIPadding")
    PagePadding.PaddingAll = UDim.new(0, 20)
    PagePadding.Parent = Page
    
    return Page
end

-- Create Card Function
local function createCard(parent, title, content)
    local Card = Instance.new("Frame")
    Card.Name = title .. "Card"
    Card.Size = UDim2.new(1, 0, 0, 200)
    Card.BackgroundColor3 = COLORS.CARD
    Card.BackgroundTransparency = 0.2
    Card.BorderSizePixel = 0
    Card.Parent = parent
    
    local CardCorner = Instance.new("UICorner")
    CardCorner.CornerRadius = UDim.new(0, 16)
    CardCorner.Parent = Card
    
    local CardPadding = Instance.new("UIPadding")
    CardPadding.PaddingAll = UDim.new(0, 20)
    CardPadding.Parent = Card
    
    local CardTitle = Instance.new("TextLabel")
    CardTitle.Name = "Title"
    CardTitle.Size = UDim2.new(1, 0, 0, 30)
    CardTitle.BackgroundTransparency = 1
    CardTitle.Text = title
    CardTitle.TextColor3 = COLORS.TEXT
    CardTitle.TextSize = 20
    CardTitle.Font = Enum.Font.GothamBold
    CardTitle.TextXAlignment = Enum.TextXAlignment.Left
    CardTitle.Parent = Card
    
    local CardContent = Instance.new("Frame")
    CardContent.Name = "Content"
    CardContent.Size = UDim2.new(1, 0, 1, -40)
    CardContent.Position = UDim2.new(0, 0, 0, 40)
    CardContent.BackgroundTransparency = 1
    CardContent.Parent = Card
    
    return Card, CardContent
end

-- Create Button Function
local function createButton(parent, text, color, callback)
    local Button = Instance.new("TextButton")
    Button.Name = text .. "Button"
    Button.Size = UDim2.new(0, 120, 0, 35)
    Button.BackgroundColor3 = color or COLORS.ACCENT
    Button.Text = text
    Button.TextColor3 = COLORS.PRIMARY
    Button.TextSize = 14
    Button.Font = Enum.Font.GothamBold
    Button.BorderSizePixel = 0
    Button.Parent = parent
    
    local ButtonCorner = Instance.new("UICorner")
    ButtonCorner.CornerRadius = UDim.new(0, 8)
    ButtonCorner.Parent = Button
    
    -- Hover Animation
    Button.MouseEnter:Connect(function()
        TweenService:Create(Button, ANIMATIONS.FAST, {BackgroundColor3 = Color3.new(
            math.min(color.R + 0.1, 1),
            math.min(color.G + 0.1, 1),
            math.min(color.B + 0.1, 1)
        )}):Play()
    end)
    
    Button.MouseLeave:Connect(function()
        TweenService:Create(Button, ANIMATIONS.FAST, {BackgroundColor3 = color}):Play()
    end)
    
    Button.MouseButton1Click:Connect(function()
        if callback then callback() end
    end)
    
    return Button
end

-- Pages
local DashboardPage = createPage("Dashboard")
local PlayersPage = createPage("Players")
local ServerPage = createPage("Server")
local EventsPage = createPage("Events")
local SettingsPage = createPage("Settings")

-- Current Page
local currentPage = DashboardPage
currentPage.Visible = true

-- Page Navigation Function
local function showPage(page)
    if currentPage then
        TweenService:Create(currentPage, ANIMATIONS.FAST, {Position = UDim2.new(-1, 0, 0, 0)}):Play()
        currentPage.Visible = false
    end
    
    page.Position = UDim2.new(1, 0, 0, 0)
    page.Visible = true
    TweenService:Create(page, ANIMATIONS.SMOOTH, {Position = UDim2.new(0, 0, 0, 0)}):Play()
    currentPage = page
end

-- Dashboard Content
local function setupDashboard()
    -- Server Stats Card
    local StatsCard, StatsContent = createCard(DashboardPage, "Server Statistics", "")
    
    local StatsLayout = Instance.new("UIListLayout")
    StatsLayout.SortOrder = Enum.SortOrder.LayoutOrder
    StatsLayout.Padding = UDim.new(0, 10)
    StatsLayout.Parent = StatsContent
    
    local PlayerCountLabel = Instance.new("TextLabel")
    PlayerCountLabel.Name = "PlayerCount"
    PlayerCountLabel.Size = UDim2.new(1, 0, 0, 25)
    PlayerCountLabel.BackgroundTransparency = 1
    PlayerCountLabel.Text = "Players Online: " .. #Players:GetPlayers()
    PlayerCountLabel.TextColor3 = COLORS.TEXT
    PlayerCountLabel.TextSize = 16
    PlayerCountLabel.Font = Enum.Font.Gotham
    PlayerCountLabel.TextXAlignment = Enum.TextXAlignment.Left
    PlayerCountLabel.LayoutOrder = 1
    PlayerCountLabel.Parent = StatsContent
    
    local UptimeLabel = Instance.new("TextLabel")
    UptimeLabel.Name = "Uptime"
    UptimeLabel.Size = UDim2.new(1, 0, 0, 25)
    UptimeLabel.BackgroundTransparency = 1
    UptimeLabel.Text = "Server Uptime: " .. math.floor(workspace.DistributedGameTime / 60) .. " minutes"
    UptimeLabel.TextColor3 = COLORS.TEXT
    UptimeLabel.TextSize = 16
    UptimeLabel.Font = Enum.Font.Gotham
    UptimeLabel.TextXAlignment = Enum.TextXAlignment.Left
    UptimeLabel.LayoutOrder = 2
    UptimeLabel.Parent = StatsContent
    
    -- Quick Actions Card
    local ActionsCard, ActionsContent = createCard(DashboardPage, "Quick Actions", "")
    ActionsCard.LayoutOrder = 2
    
    local ActionsLayout = Instance.new("UIListLayout")
    ActionsLayout.SortOrder = Enum.SortOrder.LayoutOrder
    ActionsLayout.Padding = UDim.new(0, 10)
    ActionsLayout.FillDirection = Enum.FillDirection.Horizontal
    ActionsLayout.Parent = ActionsContent
    
    createButton(ActionsContent, "Kick All", COLORS.WARNING, function()
        for _, player in pairs(Players:GetPlayers()) do
            if player ~= LocalPlayer and not isAdmin(player) then
                player:Kick("Mass kick by admin")
            end
        end
    end)
    
    createButton(ActionsContent, "Server Lock", COLORS.DESTRUCTIVE, function()
        -- Server lock functionality would go here
        print("Server locked!")
    end)
    
    createButton(ActionsContent, "Refresh GUI", COLORS.ACCENT, function()
        AdminGui:Destroy()
        -- Reload script
    end)
    
    -- Live Events Update
    local function updateStats()
        PlayerCountLabel.Text = "Players Online: " .. #Players:GetPlayers()
        UptimeLabel.Text = "Server Uptime: " .. math.floor(workspace.DistributedGameTime / 60) .. " minutes"
    end
    
    RunService.Heartbeat:Connect(updateStats)
end

-- Player Management
local function setupPlayerManagement()
    local function createPlayerCard(player)
        local PlayerCard, PlayerContent = createCard(PlayersPage, player.Name, "")
        PlayerCard.Size = UDim2.new(1, 0, 0, 150)
        
        local PlayerLayout = Instance.new("UIListLayout")
        PlayerLayout.SortOrder = Enum.SortOrder.LayoutOrder
        PlayerLayout.Padding = UDim.new(0, 8)
        PlayerLayout.FillDirection = Enum.FillDirection.Horizontal
        PlayerLayout.Parent = PlayerContent
        
        local PlayerInfo = Instance.new("Frame")
        PlayerInfo.Name = "Info"
        PlayerInfo.Size = UDim2.new(0, 200, 1, 0)
        PlayerInfo.BackgroundTransparency = 1
        PlayerInfo.LayoutOrder = 1
        PlayerInfo.Parent = PlayerContent
        
        local PlayerAvatar = Instance.new("ImageLabel")
        PlayerAvatar.Name = "Avatar"
        PlayerAvatar.Size = UDim2.new(0, 60, 0, 60)
        PlayerAvatar.BackgroundColor3 = COLORS.SECONDARY
        PlayerAvatar.Image = "https://www.roblox.com/headshot-thumbnail/image?userId=" .. player.UserId .. "&width=60&height=60&format=png"
        PlayerAvatar.Parent = PlayerInfo
        
        local AvatarCorner = Instance.new("UICorner")
        AvatarCorner.CornerRadius = UDim.new(0, 30)
        AvatarCorner.Parent = PlayerAvatar
        
        local PlayerName = Instance.new("TextLabel")
        PlayerName.Name = "PlayerName"
        PlayerName.Size = UDim2.new(1, -70, 0, 25)
        PlayerName.Position = UDim2.new(0, 70, 0, 0)
        PlayerName.BackgroundTransparency = 1
        PlayerName.Text = player.DisplayName .. " (@" .. player.Name .. ")"
        PlayerName.TextColor3 = COLORS.TEXT
        PlayerName.TextSize = 16
        PlayerName.Font = Enum.Font.GothamBold
        PlayerName.TextXAlignment = Enum.TextXAlignment.Left
        PlayerName.Parent = PlayerInfo
        
        local PlayerUserId = Instance.new("TextLabel")
        PlayerUserId.Name = "UserId"
        PlayerUserId.Size = UDim2.new(1, -70, 0, 20)
        PlayerUserId.Position = UDim2.new(0, 70, 0, 25)
        PlayerUserId.BackgroundTransparency = 1
        PlayerUserId.Text = "User ID: " .. player.UserId
        PlayerUserId.TextColor3 = COLORS.SECONDARY_TEXT
        PlayerUserId.TextSize = 14
        PlayerUserId.Font = Enum.Font.Gotham
        PlayerUserId.TextXAlignment = Enum.TextXAlignment.Left
        PlayerUserId.Parent = PlayerInfo
        
        -- Action Buttons
        local ActionsFrame = Instance.new("Frame")
        ActionsFrame.Name = "Actions"
        ActionsFrame.Size = UDim2.new(1, -220, 1, 0)
        ActionsFrame.BackgroundTransparency = 1
        ActionsFrame.LayoutOrder = 2
        ActionsFrame.Parent = PlayerContent
        
        local ActionLayout = Instance.new("UIListLayout")
        ActionLayout.SortOrder = Enum.SortOrder.LayoutOrder
        ActionLayout.Padding = UDim.new(0, 8)
        ActionLayout.FillDirection = Enum.FillDirection.Horizontal
        ActionLayout.Parent = ActionsFrame
        
        if player ~= LocalPlayer and not isAdmin(player) then
            createButton(ActionsFrame, "Kick", COLORS.WARNING, function()
                player:Kick("Kicked by admin")
            end)
            
            createButton(ActionsFrame, "Ban", COLORS.DESTRUCTIVE, function()
                BannedPlayers[player.UserId] = true
                player:Kick("Banned by admin")
            end)
            
            createButton(ActionsFrame, "Warn", COLORS.ACCENT, function()
                WarnedPlayers[player.UserId] = (WarnedPlayers[player.UserId] or 0) + 1
                -- Send warning message to player
            end)
            
            createButton(ActionsFrame, "Teleport", COLORS.SUCCESS, function()
                if LocalPlayer.Character and LocalPlayer.Character:FindFirstChild("HumanoidRootPart") and
                   player.Character and player.Character:FindFirstChild("HumanoidRootPart") then
                    player.Character.HumanoidRootPart.CFrame = LocalPlayer.Character.HumanoidRootPart.CFrame
                end
            end)
        end
        
        return PlayerCard
    end
    
    local function refreshPlayerList()
        for _, child in pairs(PlayersPage:GetChildren()) do
            if child:IsA("Frame") and child.Name:match("Card") then
                child:Destroy()
            end
        end
        
        for _, player in pairs(Players:GetPlayers()) do
            createPlayerCard(player)
        end
    end
    
    refreshPlayerList()
    
    Players.PlayerAdded:Connect(refreshPlayerList)
    Players.PlayerRemoving:Connect(refreshPlayerList)
end

-- Server Management
local function setupServerManagement()
    -- Server Announcement Card
    local AnnouncementCard, AnnouncementContent = createCard(ServerPage, "Server Announcements", "")
    
    local AnnouncementInput = Instance.new("TextBox")
    AnnouncementInput.Name = "AnnouncementInput"
    AnnouncementInput.Size = UDim2.new(1, -130, 0, 35)
    AnnouncementInput.BackgroundColor3 = COLORS.SECONDARY
    AnnouncementInput.PlaceholderText = "Enter announcement message..."
    AnnouncementInput.Text = ""
    AnnouncementInput.TextColor3 = COLORS.TEXT
    AnnouncementInput.PlaceholderColor3 = COLORS.SECONDARY_TEXT
    AnnouncementInput.TextSize = 14
    AnnouncementInput.Font = Enum.Font.Gotham
    AnnouncementInput.BorderSizePixel = 0
    AnnouncementInput.ClearTextOnFocus = false
    AnnouncementInput.Parent = AnnouncementContent
    
    local InputCorner = Instance.new("UICorner")
    InputCorner.CornerRadius = UDim.new(0, 8)
    InputCorner.Parent = AnnouncementInput
    
    local SendButton = createButton(AnnouncementContent, "Send", COLORS.ACCENT, function()
        local message = AnnouncementInput.Text
        if message ~= "" then
            -- Send announcement to all players
            for _, player in pairs(Players:GetPlayers()) do
                StarterGui:SetCore("ChatMakeSystemMessage", {
                    Text = "[ADMIN ANNOUNCEMENT] " .. message;
                    Color = Color3.fromRGB(255, 255, 0);
                    Font = Enum.Font.GothamBold;
                    FontSize = Enum.FontSize.Size18;
                })
            end
            AnnouncementInput.Text = ""
        end
    end)
    SendButton.Position = UDim2.new(1, -120, 0, 0)
    
    -- Server Controls Card
    local ControlsCard, ControlsContent = createCard(ServerPage, "Server Controls", "")
    ControlsCard.LayoutOrder = 2
    
    local ControlsLayout = Instance.new("UIListLayout")
    ControlsLayout.SortOrder = Enum.SortOrder.LayoutOrder
    ControlsLayout.Padding = UDim.new(0, 10)
    ControlsLayout.FillDirection = Enum.FillDirection.Horizontal
    ControlsLayout.Parent = ControlsContent
    
    createButton(ControlsContent, "Shutdown", COLORS.DESTRUCTIVE, function()
        -- Shutdown server (if you have the permissions)
        for _, player in pairs(Players:GetPlayers()) do
            player:Kick("Server shutdown by admin")
        end
    end)
    
    createButton(ControlsContent, "Reset Server", COLORS.WARNING, function()
        -- Reset server data
        BannedPlayers = {}
        WarnedPlayers = {}
        print("Server data reset!")
    end)
    
    createButton(ControlsContent, "Save Data", COLORS.SUCCESS, function()
        -- Save admin data
        print("Data saved!")
    end)
end

-- Live Events System
local function setupLiveEvents()
    local EventsCard, EventsContent = createCard(EventsPage, "Live Events", "")
    
    local EventsList = Instance.new("ScrollingFrame")
    EventsList.Name = "EventsList"
    EventsList.Size = UDim2.new(1, 0, 1, 0)
    EventsList.BackgroundTransparency = 1
    EventsList.BorderSizePixel = 0
    EventsList.ScrollBarThickness = 4
    EventsList.ScrollBarImageColor3 = COLORS.ACCENT
    EventsList.CanvasSize = UDim2.new(0, 0, 0, 0)
    EventsList.Parent = EventsContent
    
    local EventsLayout = Instance.new("UIListLayout")
    EventsLayout.SortOrder = Enum.SortOrder.LayoutOrder
    EventsLayout.Padding = UDim.new(0, 5)
    EventsLayout.Parent = EventsList
    
    local function addEvent(eventType, message, color)
        local Event = Instance.new("Frame")
        Event.Name = "Event"
        Event.Size = UDim2.new(1, 0, 0, 30)
        Event.BackgroundColor3 = color or COLORS.CARD
        Event.BackgroundTransparency = 0.5
        Event.BorderSizePixel = 0
        Event.Parent = EventsList
        
        local EventCorner = Instance.new("UICorner")
        EventCorner.CornerRadius = UDim.new(0, 6)
        EventCorner.Parent = Event
        
        local EventText = Instance.new("TextLabel")
        EventText.Name = "EventText"
        EventText.Size = UDim2.new(1, -20, 1, 0)
        EventText.Position = UDim2.new(0, 10, 0, 0)
        EventText.BackgroundTransparency = 1
        EventText.Text = "[" .. os.date("%H:%M:%S") .. "] " .. eventType .. ": " .. message
        EventText.TextColor3 = COLORS.TEXT
        EventText.TextSize = 12
        EventText.Font = Enum.Font.Gotham
        EventText.TextXAlignment = Enum.TextXAlignment.Left
        EventText.Parent = Event
        
        -- Auto-scroll to bottom
        EventsList.CanvasPosition = Vector2.new(0, EventsList.AbsoluteCanvasSize.Y)
        
        -- Animate in
        Event.BackgroundTransparency = 1
        TweenService:Create(Event, ANIMATIONS.FAST, {BackgroundTransparency = 0.5}):Play()
    end
    
    -- Event Listeners
    Players.PlayerAdded:Connect(function(player)
        addEvent("JOIN", player.Name .. " joined the server", COLORS.SUCCESS)
    end)
    
    Players.PlayerRemoving:Connect(function(player)
        addEvent("LEAVE", player.Name .. " left the server", COLORS.WARNING)
    end)
    
    -- Add initial event
    addEvent("SYSTEM", "Admin GUI initialized", COLORS.ACCENT)
end

-- Settings
local function setupSettings()
    local SettingsCard, SettingsContent = createCard(SettingsPage, "GUI Settings", "")
    
    local SettingsLayout = Instance.new("UIListLayout")
    SettingsLayout.SortOrder = Enum.SortOrder.LayoutOrder
    SettingsLayout.Padding = UDim.new(0, 15)
    SettingsLayout.Parent = SettingsContent
    
    -- Theme Toggle (placeholder)
    local ThemeFrame = Instance.new("Frame")
    ThemeFrame.Name = "ThemeFrame"
    ThemeFrame.Size = UDim2.new(1, 0, 0, 40)
    ThemeFrame.BackgroundTransparency = 1
    ThemeFrame.LayoutOrder = 1
    ThemeFrame.Parent = SettingsContent
    
    local ThemeLabel = Instance.new("TextLabel")
    ThemeLabel.Name = "ThemeLabel"
    ThemeLabel.Size = UDim2.new(0.7, 0, 1, 0)
    ThemeLabel.BackgroundTransparency = 1
    ThemeLabel.Text = "Dark Theme (Apple Style)"
    ThemeLabel.TextColor3 = COLORS.TEXT
    ThemeLabel.TextSize = 16
    ThemeLabel.Font = Enum.Font.Gotham
    ThemeLabel.TextXAlignment = Enum.TextXAlignment.Left
    ThemeLabel.Parent = ThemeFrame
    
    local ThemeToggle = createButton(ThemeFrame, "Enabled", COLORS.SUCCESS, function()
        -- Theme toggle functionality
    end)
    ThemeToggle.Position = UDim2.new(0.7, 0, 0, 2.5)
    ThemeToggle.Size = UDim2.new(0, 80, 0, 35)
end

-- Create Navigation Buttons
createNavButton("Dashboard", 1, function() showPage(DashboardPage) end)
createNavButton("Players", 2, function() showPage(PlayersPage) end)
createNavButton("Server", 3, function() showPage(ServerPage) end)
createNavButton("Live Events", 4, function() showPage(EventsPage) end)
createNavButton("Settings", 5, function() showPage(SettingsPage) end)

-- Setup all pages
setupDashboard()
setupPlayerManagement()
setupServerManagement()
setupLiveEvents()
setupSettings()

-- Toggle GUI Function
local function toggleGUI()
    if MainFrame.Visible then
        -- Hide animation
        TweenService:Create(BlurEffect, ANIMATIONS.SMOOTH, {Size = 0}):Play()
        TweenService:Create(MainFrame, ANIMATIONS.SPRING, {
            Size = UDim2.new(0, 0, 0, 0),
            Position = UDim2.new(0.5, 0, 0.5, 0)
        }):Play()
        wait(0.6)
        MainFrame.Visible = false
    else
        -- Show animation
        MainFrame.Visible = true
        MainFrame.Size = UDim2.new(0, 0, 0, 0)
        MainFrame.Position = UDim2.new(0.5, 0, 0.5, 0)
        TweenService:Create(BlurEffect, ANIMATIONS.SMOOTH, {Size = 15}):Play()
        TweenService:Create(MainFrame, ANIMATIONS.SPRING, {
            Size = UDim2.new(0, 800, 0, 600),
            Position = UDim2.new(0.5, -400, 0.5, -300)
        }):Play()
    end
end

-- Close Button Function
CloseButton.MouseButton1Click:Connect(function()
    toggleGUI()
end)

-- Keybind to toggle GUI (Right Control)
UserInputService.InputBegan:Connect(function(input, gameProcessed)
    if gameProcessed then return end
    
    if input.KeyCode == Enum.KeyCode.RightControl then
        toggleGUI()
    end
end)

-- Initial show animation
wait(0.5)
toggleGUI()

print("Apple Admin GUI loaded successfully!")
print("Press Right Control to toggle the GUI")