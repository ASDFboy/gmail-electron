# Gmail Electron

A tiny, no-frills Electron wrapper that runs Gmail in its own desktop window — so it behaves like a real app (its own icon, its own taskbar entry, pinnable, no browser chrome) instead of just another browser tab.

This is an unofficial, community wrapper. It is not affiliated with, endorsed by, or associated with Google in any way. "Gmail" is a trademark of Google LLC.

## What it does

- Opens `mail.google.com` in a plain `BrowserWindow` — nothing more.
- Sets a standard desktop Chrome user-agent, since Google's sign-in page blocks unrecognized embedded browsers (including Electron's default UA) with a "this browser may not be secure" error.
- Uses a persistent session partition so you stay signed in between launches, the same way a normal browser profile would.
- Keeps the window titled "Gmail" instead of the unread-count title Gmail sets on the page.

## Privacy

- The app has no analytics, telemetry, or tracking of any kind, and makes no network requests other than loading Gmail itself.
- Your Gmail session (cookies, login state) is stored locally by Electron in the normal per-OS app-data folder, under this app's own partition — it isn't sent anywhere except to Google, exactly as a browser tab would.
- The source here is everything the app does; there's no hidden build step or bundled service.

## Running it from source

```bash
npm install
npm start
```

## Building a desktop app yourself

```bash
npm install

npm run package:win    # → dist/Gmail Desktop-win32-x64/Gmail Desktop.exe
npm run package:mac    # → dist/Gmail Desktop-darwin-universal/Gmail Desktop.app
npm run package:linux  # → dist/Gmail Desktop-linux-x64/Gmail Desktop
```

Drop your own `icon.ico` (Windows), `icon.icns` (macOS), or `icon.png` (Linux/window icon) in the project root before packaging to brand the build — none are committed to this repo by default.

## License

MIT — see [LICENSE](LICENSE). Use it, fork it, package it, ship it.

## Credits

Built with [Claude](https://claude.com) (Anthropic).
