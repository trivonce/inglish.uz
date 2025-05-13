export function getSupportedAudioMimeType(): string {
    const types = [
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/mp4', // iOS fallback
      'audio/mpeg',
    ];
  
    for (const type of types) {
      if (MediaRecorder.isTypeSupported(type)) return type;
    }
  
    return ''; // Let browser pick default
  }
  