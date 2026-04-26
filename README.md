# Edge Settings Export/Import Extension

<p align="center">
  <img src="icons/icon128.png" alt="Extension Icon" width="128" height="128">
</p>

<p align="center">
  <strong>Transfer your Microsoft Edge browser settings between devices with ease</strong>
</p>

<p align="center">
  <a href="https://zozimustechnologies.github.io/settingsimportexport/" target="_blank">🌐 Website</a> •
  <a href="#features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#support">Support</a>
</p>

---

## Features

- 📤 **Export Settings** — Save your Edge browser settings to an XML file
- 📥 **Import Settings** — Load settings from XML to restore your preferences
- 🎯 **Side Panel UI** — Modern, clean interface accessible from the Edge sidebar
- 🔄 **Cross-Device Transfer** — Move your settings between computers easily
- 📊 **Detailed Results** — See exactly which settings changed, stayed the same, or were skipped
- 🔒 **Privacy First** — All data stays local, nothing sent to external servers

## What Settings Are Included

### Content Settings
| Setting | Description |
|---------|-------------|
| Cookies | Cookie acceptance preferences |
| Images | Image loading behavior |
| JavaScript | JavaScript execution settings |
| Notifications | Push notification permissions |
| Popups | Popup blocker configuration |
| Location | Geolocation access |
| Camera | Camera access permissions |
| Microphone | Microphone access permissions |
| Auto Downloads | Automatic download settings |

### Privacy Settings
| Setting | Description |
|---------|-------------|
| Do Not Track | DNT header preference |
| Network Prediction | Prefetching behavior |
| Safe Browsing | Phishing/malware protection |
| Search Suggestions | Search autocomplete |
| Hyperlink Auditing | Link ping tracking |
| Referrer Headers | Referrer policy |
| Spelling Service | Cloud spelling check |
| Translation Service | Auto-translate settings |
| Autofill | Form autofill preferences |
| Password Saving | Password manager settings |

### Font Settings
- Default font size
- Fixed-width font size  
- Minimum font size

## Installation

### Load Unpacked (Developer Mode)

1. Download or clone this repository
2. Open Microsoft Edge
3. Navigate to `edge://extensions/`
4. Enable **Developer mode** (toggle in the left sidebar)
5. Click **Load unpacked**
6. Select the `edge-settings-extension` folder
7. Pin the extension to your toolbar for easy access

## Usage

### Exporting Settings

1. Click the extension icon in your Edge toolbar
2. The side panel opens with Export and Import options
3. Click **Export to XML**
4. Choose where to save the file
5. View the exported settings summary in the panel

### Importing Settings

1. Click the extension icon to open the side panel
2. Click **Import from XML**
3. Select your previously exported XML file
4. View detailed results showing:
   - ✓ **Changed** — Settings that were updated (with before/after values)
   - ○ **Already Same** — Settings that matched and didn't need changes
   - ⊘ **Skipped** — Settings controlled by policy or unavailable
   - ✗ **Failed** — Settings that couldn't be applied
5. Restart Edge to ensure all changes take effect

## XML File Format

```xml
<?xml version="1.0" encoding="UTF-8"?>
<EdgeSettings>
  <ExportDate>2026-02-03T12:00:00.000Z</ExportDate>
  <ExportVersion>1.6</ExportVersion>
  <ContentSettings>
    <Setting name="cookies" value="allow" />
    <Setting name="javascript" value="allow" />
    <Setting name="notifications" value="ask" />
  </ContentSettings>
  <PrivacySettings>
    <Setting category="websites" name="doNotTrackEnabled" 
             value="true" levelOfControl="controllable_by_this_extension" />
  </PrivacySettings>
  <FontSettings>
    <DefaultFontSize>16</DefaultFontSize>
    <MinimumFontSize>12</MinimumFontSize>
  </FontSettings>
</EdgeSettings>
```

## Permissions

| Permission | Purpose |
|------------|---------|
| `storage` | Save extension preferences |
| `downloads` | Download exported XML files |
| `contentSettings` | Read/write site permissions |
| `privacy` | Read/write privacy settings |
| `fontSettings` | Read/write font preferences |
| `sidePanel` | Display the side panel UI |
| `tabs` | Open side panel on icon click |

## Troubleshooting

### Settings not applying after import
- **Policy controlled**: Some settings are locked by your organization's IT policies
- **Restart required**: Close and reopen Edge for changes to take full effect

### Export downloads empty or fails
- Ensure Edge has permission to access your Downloads folder
- Try selecting a different save location

### Side panel not opening
- Make sure you're clicking the extension icon in the toolbar
- Try reloading the extension from `edge://extensions`

## Privacy & Security

🔒 **Your data stays local**
- No external servers or APIs
- No analytics or tracking
- XML files stored only where you save them
- Open source — inspect the code yourself

## Support Development

If you find this extension useful, consider supporting its development:

<a href="https://wise.com/pay/r/wC7Us-4r3knkCCY">
  <img src="https://img.shields.io/badge/Donate-Wise-00B9FF?style=for-the-badge&logo=wise" alt="Donate via Wise">
</a>

## Version History

### v1.6.0 (Current)
- Side panel UI for better experience
- Detailed import results with before/after values
- Export results display
- New circular gradient icon
- Donate button added

### v1.0.0
- Initial release
- Basic export/import functionality

## License

[MIT License](/LICENSE) — Feel free to modify and distribute.

---

<p align="center">
  Made with ❤️ for the Edge community
</p>
