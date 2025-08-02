# 🍎 Apple-Inspired Roblox Admin GUI

A modern, sleek admin GUI for Roblox with Apple-inspired design language, featuring smooth animations, blurred backgrounds, and comprehensive admin tools.

## ✨ Features

### 🎨 Apple-Style Design
- **Dark Theme**: Modern dark gray color scheme matching Apple's design language
- **Blur Effects**: Beautiful background blur when GUI is open
- **Smooth Animations**: Spring-based animations with Apple-style easing
- **Rounded Corners**: Consistent 8-20px radius throughout the interface
- **Modern Typography**: Clean Gotham font with proper hierarchy

### 👥 Player Management
- **Real-time Player List**: Live updating player cards with avatars
- **Player Actions**:
  - 🦵 **Kick**: Remove players from the server
  - 🚫 **Ban**: Permanently ban players (stored in session)
  - ⚠️ **Warn**: Issue warnings to players (with counter)
  - 📍 **Teleport**: Teleport players to your location
- **Player Info**: Display names, usernames, and User IDs
- **Admin Protection**: Admins cannot be targeted by actions

### 🖥️ Server Management
- **📢 Server Announcements**: Send styled messages to all players
- **🎮 Server Controls**:
  - Mass kick all non-admin players
  - Server lock functionality
  - Data reset capabilities
  - GUI refresh option

### 🔴 Live Events System
- **Real-time Monitoring**: Track all server events as they happen
- **Event Types**:
  - Player joins/leaves
  - Admin actions
  - System events
- **Timestamped Logs**: All events include precise timestamps
- **Color-coded Events**: Different colors for different event types

### 📊 Dashboard
- **Server Statistics**: Live player count and uptime
- **Quick Actions**: One-click access to common admin functions
- **System Status**: Monitor server health and performance

## 🚀 Installation

1. **Open Roblox Studio**
2. **Create a ServerScript** in ServerScriptService
3. **Copy and paste** the entire `AdminGUI.lua` code
4. **Configure Admin Users** (see Configuration section)
5. **Run the game** to test

## ⚙️ Configuration

### Adding Admins

Edit the `ADMIN_USERS` table at the top of the script:

```lua
local ADMIN_USERS = {
    [LocalPlayer.UserId] = true, -- Your User ID
    [123456789] = true,          -- Friend's User ID
    [987654321] = true,          -- Another admin's User ID
    -- Add more admin user IDs as needed
}
```

To find User IDs:
1. Go to a player's Roblox profile
2. Look at the URL: `roblox.com/users/[USER_ID]/profile`
3. The number is their User ID

### Customization

You can customize colors, animations, and features by modifying the constants:

```lua
-- Modify colors in the COLORS table
local COLORS = {
    ACCENT = Color3.fromRGB(0, 122, 255), -- Change accent color
    DESTRUCTIVE = Color3.fromRGB(255, 59, 48), -- Change destructive action color
    -- ... other colors
}

-- Modify animation speeds
local ANIMATIONS = {
    SPRING = TweenInfo.new(0.6, Enum.EasingStyle.Back, Enum.EasingDirection.Out),
    SMOOTH = TweenInfo.new(0.3, Enum.EasingStyle.Quart, Enum.EasingDirection.Out),
    FAST = TweenInfo.new(0.15, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)
}
```

## 🎮 Controls

- **Right Control**: Toggle GUI visibility
- **Close Button**: Hide the GUI (red X button)
- **Navigation**: Click sidebar buttons to switch pages
- **Hover Effects**: Buttons respond to mouse hover
- **Click Animations**: Satisfying click feedback on all buttons

## 📱 Interface Overview

### Navigation Sidebar
- 📊 **Dashboard**: Overview and quick actions
- 👥 **Players**: Player management and actions
- 🖥️ **Server**: Server announcements and controls
- 🔴 **Live Events**: Real-time event monitoring
- ⚙️ **Settings**: GUI configuration options

### Action Buttons
Each page contains contextual action buttons with color coding:
- 🔵 **Blue (Accent)**: Primary actions (teleport, send, etc.)
- 🟢 **Green (Success)**: Positive actions (save, enable, etc.)
- 🟠 **Orange (Warning)**: Cautionary actions (kick, reset, etc.)
- 🔴 **Red (Destructive)**: Dangerous actions (ban, shutdown, etc.)

## 🔧 Features Breakdown

### Responsive Design
- Adapts to different screen sizes
- Scrollable content areas
- Consistent spacing and padding

### Performance Optimized
- Efficient event handling
- Minimal memory footprint
- Smooth 60fps animations

### Security Features
- Admin-only access control
- Protected against non-admin usage
- Secure player targeting system

## 🎯 Future Enhancements

Potential additions for future versions:
- **Theme Switching**: Light mode toggle
- **Custom Commands**: Text-based command system
- **Advanced Filtering**: Player search and filters
- **Export Logs**: Save event logs to external files
- **Time-based Bans**: Temporary ban system
- **Multiple Admin Levels**: Different permission levels

## 🛠️ Troubleshooting

### GUI Not Appearing
1. Check if you're listed in `ADMIN_USERS`
2. Verify the script is in ServerScriptService
3. Try pressing Right Control to toggle

### Animations Not Working
1. Ensure TweenService is available
2. Check for script errors in output
3. Verify Roblox Studio settings allow tweening

### Player Actions Not Working
1. Confirm you have admin permissions
2. Check target player is not an admin
3. Verify player is still in the game

## 📄 License

This script is provided as-is for educational and entertainment purposes. Feel free to modify and distribute according to your needs.

## 🤝 Contributing

Found a bug or want to suggest a feature? Create an issue or submit a pull request!

---

**Made with ❤️ for the Roblox community**

*Apple design principles applied to create the most beautiful admin GUI experience possible.*