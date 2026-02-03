# Edge Settings Export/Import Extension

A Microsoft Edge browser extension that allows you to easily export your browser settings to an XML file and import them on another device.

## Features

- **Export Settings** - Save your Edge browser settings to an XML file that downloads to your desktop
- **Import Settings** - Load settings from an XML file to apply them to your current browser
- **Simple UI** - Clean, intuitive interface with clear Export and Import buttons
- **Cross-Device Transfer** - Move your settings between computers easily

## What Settings Are Included

The extension exports and imports the following settings:

### Content Settings
- Cookies preferences
- Images loading behavior
- JavaScript settings
- Notification permissions
- Popup blocker settings
- Location access
- Camera access
- Microphone access
- Automatic downloads

### Privacy Settings
- Network prediction (prefetching)
- Do Not Track
- Hyperlink auditing
- Referrer headers
- Safe browsing
- Search suggestions
- Spelling service
- Translation service

### Extension Storage
- Sync storage data
- Local storage data

## Installation

### Method 1: Load Unpacked (Developer Mode)

1. Open Microsoft Edge
2. Navigate to `edge://extensions/`
3. Enable **Developer mode** (toggle in the bottom-left or sidebar)
4. Click **Load unpacked**
5. Select the `edge-settings-extension` folder
6. The extension icon will appear in your toolbar

### Method 2: Pack and Install

1. In `edge://extensions/` with Developer mode on
2. Click **Pack extension**
3. Browse to the `edge-settings-extension` folder
4. Click **Pack Extension**
5. A `.crx` file will be created
6. Drag the `.crx` file into Edge to install

## Usage

### Exporting Settings

1. Click the extension icon in your Edge toolbar
2. Click the blue **Export to XML** button
3. Choose where to save the file (defaults to Downloads)
4. Your settings are now saved in the XML file

### Importing Settings

1. Click the extension icon in your Edge toolbar
2. Click the green **Import from XML** button
3. Browse to and select your previously exported XML file
4. Settings will be applied automatically
5. A status message confirms success or reports any issues

## XML File Structure

The exported XML file has the following structure:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<EdgeSettings>
  <ExportDate>2026-02-03T12:00:00.000Z</ExportDate>
  <ExportVersion>1.0</ExportVersion>
  <BrowserInfo>
    <UserAgent>...</UserAgent>
    <Platform>Win32</Platform>
    <Language>en-US</Language>
  </BrowserInfo>
  <ContentSettings>
    <Cookies>allow</Cookies>
    <Javascript>allow</Javascript>
    <!-- ... more settings ... -->
  </ContentSettings>
  <PrivacySettings>
    <DoNotTrack>true</DoNotTrack>
    <!-- ... more settings ... -->
  </PrivacySettings>
  <ExtensionStorage>
    <Sync><!-- synced extension data --></Sync>
    <Local><!-- local extension data --></Local>
  </ExtensionStorage>
</EdgeSettings>
```

## Permissions Required

The extension requires these permissions:
- `storage` - Access extension storage data
- `downloads` - Download the exported XML file
- `contentSettings` - Read/write content settings
- `privacy` - Read/write privacy settings
- `browsingData` - Access browsing configuration

## Troubleshooting

### Export not working
- Ensure you have allowed the extension to access downloads
- Check if your Downloads folder is accessible
- Try selecting a different save location

### Import not applying all settings
- Some settings may be controlled by enterprise policies
- Certain settings require additional permissions
- Check the status message for details on which settings succeeded/failed

### File picker not opening
- Refresh the extension popup
- Check if Edge has file access permissions

## Privacy

- All data stays local - nothing is sent to external servers
- XML files are stored only where you save them
- No analytics or tracking is included

## Version History

### 1.0.0
- Initial release
- Export/Import for content settings, privacy settings, and extension storage
- Clean, modern UI design

## License

MIT License - Feel free to modify and distribute.
