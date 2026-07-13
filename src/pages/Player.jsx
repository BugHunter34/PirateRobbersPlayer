import { useLocation } from 'react-router-dom';
import { VideoPlayer } from '../components/VideoPlayer';

export default function PlayerPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const videoUrl = searchParams.get('video');

  // build subs array
  const subtitleData = [];
  
  const firstSub = searchParams.get('subtitles');
  if (firstSub) {
    subtitleData.push({
      src: firstSub,
      lang: 'sub-1', 
      label: 'Subtitles 1',
      default: true // Make the first one default
    });
  }

  // Loop to check for ?subtitles2=, ?subtitles3=,...
  let index = 2;
  while (searchParams.get(`subtitles${index}`)) {
    const nextSub = searchParams.get(`subtitles${index}`);
    subtitleData.push({
      src: nextSub,
      lang: `sub-${index}`,
      label: `Subtitles ${index}`,
      default: false 
    });
    index++;
  }

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.title}>Player</h1>
      
      {videoUrl ? (
        <div style={styles.playerWrapper}>
          <VideoPlayer 
            src={videoUrl} 
            // Pass entire array to choose from (VideoPlayer safely handles undefined)
            subtitles={subtitleData.length > 0 ? subtitleData : undefined} 
            className="w-full h-full" 
            style={{ width: '100%', height: '100%' }} 
          />
        </div>
      ) : (
        <p style={styles.error}>No video URL provided.</p>
      )}
    </div>
  );
}

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#0f0f0f',
    color: '#ffffff',
    fontFamily: 'system-ui, sans-serif',
    padding: '2rem'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    letterSpacing: '0.05em'
  },
  playerWrapper: {
    width: '75vw',
    aspectRatio: '16 / 9',
    backgroundColor: '#000',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
  },
  error: {
    color: '#ff6b6b',
    fontSize: '1.2rem'
  }
};