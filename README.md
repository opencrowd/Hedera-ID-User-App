# Hedera Persona: Identity Application

### Installation Instructions
- Requires Node.js (version 10 or newer)
- `npm install -g expo-cli`
- `git clone` and `cd` into project
- `npm install`

### Run with Expo App
- Install Expo App on mobile device
- `expo start` inside project repo. Will open browser tab with QR Code
- Inside mobile app, go to Projects tab and select 'Scan R Code'

### Build and Run Mobile App
https://docs.expo.io/versions/latest/distribution/building-standalone-apps/

### Uploading data to Hedera file server
(See Hedera File Server docs for detailed File Server API info)

File should be uploaded as a JSON string with the following key/val pairs:
```
{
    'photoData': base64 string representation of jpg image,
    'name': string,
    'is21': bool,
    'is18': bool,
    'address': string
}
```

If upload is successful, Hedera File Server API should return a comma-separated File ID:
Ex: `0,0,1003`

This ID, including commas, should be input via the FileIDRegistration page of the app.

## App Pages and Status
###Login
Allows user to input username and pin.
#####Status:  Currently no validation performed on login info.

###File ID Registration
Allows user to enter File ID. Contents of file can be viewed in next page.
#####Status: Feature complete.

###File Viewer
Uses File ID from previous page to call hedera file API, get and parse file data, and display.
#####Status: Feature complete. Missing some updated design elements (18+ , 21+ icons)

###Profile Combination Selector
Allows user to save QR codes representing different combinations of identity features:
Ex. QRCode #1: Photo + Name + Address
QRCode #2: Photo + is21
#####Status: QR codes do not perist if app is restarted.

###QrCodeSelector
Allows user to selected a saved qr code (from previous page).
#####Status: QR codes do not perist if app is restarted.

###Additional 
- **Navigation bar/menu**: App will require restructuring of state management for nav bar and menu to work properly so they have been disabled. Currently, state on each page is transient, with each page passing relevant state variables to the next page in the sequence.
Ex. FileIDRegistration page passes `fileId` to FileViewer page
Navigation between pages at will requires introduction of global state management via Redux or similar library.




