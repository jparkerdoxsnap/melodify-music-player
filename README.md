# 🎵 Melodify - Beautiful Music Player

A stunning, feature-rich music player built with React, TypeScript, and Tailwind CSS. Play your local music files with a premium user experience that rivals professional streaming apps.

![Melodify Music Player](https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop)

## 🌐 Live Demo

**[🎵 Try Melodify Live](https://yourusername.github.io/melodify-music-player/)**

*Replace `yourusername` with your actual GitHub username*

## ✨ Features

### 🎨 **Premium Design**
- **Glassmorphism UI** with sophisticated backdrop blur effects
- **Animated Background** with floating gradient orbs
- **Vinyl Record Animation** that spins when music is playing
- **Audio Visualizer** with animated bars in track list
- **Responsive Design** optimized for both mobile and desktop

### 🎵 **Music Playback**
- **Local File Support** - Upload and play your own music files
- **Drag & Drop** - Simply drag music files into the player
- **Full Playback Controls** - Play, pause, next, previous
- **Progress Bar** with smooth seeking and real-time preview
- **Volume Control** with mute functionality
- **Shuffle & Repeat** modes (off, all, one)

### 📱 **User Experience**
- **Like System** - Heart your favorite tracks
- **Track Management** - View file sizes, duration, and metadata
- **Keyboard Shortcuts** - Space to play/pause, arrow keys for navigation
- **Accessibility** - Full keyboard navigation and screen reader support
- **Performance** - Smooth 60fps animations and optimized rendering

### 🔧 **Technical Features**
- **TypeScript** for type safety and better development experience
- **React Hooks** for modern state management
- **Tailwind CSS** for utility-first styling
- **Lucide Icons** for consistent iconography
- **Responsive Breakpoints** for all device sizes

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed on your system
- Modern web browser with audio support

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/melodify-music-player.git
   cd melodify-music-player
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 📱 Usage

### Adding Music
1. **Upload Files**: Click the "Add Music" button or drag & drop audio files
2. **Supported Formats**: MP3, WAV, FLAC, AAC, OGG, and more
3. **Multiple Files**: Select multiple files at once for batch upload

### Playback Controls
- **Play/Pause**: Click the main play button or press spacebar
- **Skip Tracks**: Use next/previous buttons or arrow keys
- **Seek**: Click or drag on the progress bar
- **Volume**: Use the volume slider or mute button
- **Shuffle**: Randomize track order
- **Repeat**: Loop all tracks or repeat current track

### Track Management
- **Like Tracks**: Click the heart icon to favorite songs
- **Track Info**: View title, artist, duration, and file size
- **Quick Play**: Click any track in the list to play immediately

## 🛠️ Development

### Project Structure
```
src/
├── components/
│   ├── MusicPlayer.tsx      # Main player component
│   ├── TrackList.tsx        # Track listing and management
│   ├── PlayerControls.tsx   # Play/pause/skip controls
│   ├── ProgressBar.tsx      # Seek bar with dragging
│   └── VolumeControl.tsx    # Volume slider and mute
├── App.tsx                  # Root application component
├── main.tsx                 # Application entry point
└── index.css               # Global styles and animations
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

### Customization
The player is highly customizable through Tailwind CSS classes and component props:

- **Colors**: Modify gradient colors in the component files
- **Animations**: Adjust animation durations in `index.css`
- **Layout**: Change responsive breakpoints in Tailwind config
- **Icons**: Replace Lucide icons with your preferred icon set

## 🌐 Deployment Options

### GitHub Pages (Free & Easy) ⭐
**Perfect for showcasing your project!**

#### Method 1: Automatic Deployment (Recommended)
1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Source: "GitHub Actions"
4. The workflow will automatically deploy on every push to main

#### Method 2: Manual Deployment
```bash
# Build and deploy manually
npm run deploy
```

#### Method 3: Using GitHub Web Interface
1. Build locally: `npm run build`
2. Upload the `dist` folder contents to `gh-pages` branch

**Your site will be available at:**
`https://yourusername.github.io/melodify-music-player/`

### Other Deployment Options

#### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

#### Vercel
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Deploy with default settings

## 📱 GitHub Pages Setup Guide

### Step-by-Step Instructions:

1. **Create GitHub Repository**
   - Go to github.com → New repository
   - Name: `melodify-music-player`
   - Make it public
   - Initialize with README

2. **Upload Your Code**
   - Clone the repo or upload files
   - Push your code to the `main` branch

3. **Enable GitHub Pages**
   - Go to Settings → Pages
   - Source: "GitHub Actions"
   - Save

4. **Automatic Deployment**
   - Every push to `main` will trigger deployment
   - Check the Actions tab for deployment status
   - Your site will be live in 2-3 minutes

5. **Custom Domain (Optional)**
   - Add a `CNAME` file with your domain
   - Configure DNS settings
   - Enable HTTPS in Pages settings

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines
1. Follow the existing code style and TypeScript patterns
2. Add proper type definitions for new features
3. Test on both mobile and desktop devices
4. Ensure accessibility standards are maintained
5. Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icon set
- **Pexels** for the stock photos used in documentation
- **Vite** for the fast build tool
- **GitHub Pages** for free hosting

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/melodify-music-player/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

## 🔮 Roadmap

- [ ] **Playlist Management** - Create and manage custom playlists
- [ ] **Equalizer** - Audio frequency adjustment controls
- [ ] **Lyrics Display** - Show synchronized lyrics
- [ ] **Cloud Storage** - Integration with cloud music services
- [ ] **Social Features** - Share tracks and playlists
- [ ] **Themes** - Multiple color themes and customization
- [ ] **Keyboard Shortcuts** - Full keyboard navigation
- [ ] **Mini Player** - Compact mode for multitasking

---

**Made with ❤️ by [Your Name]**

*Melodify - Where your music comes alive*

**🌟 Star this repo if you found it helpful!**