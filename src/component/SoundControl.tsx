import React, { useState, useEffect, useRef } from 'react';
import muteImg from './assets/mute.png';
import voiceImg from './assets/voice.png';

interface SoundControlProps {
    hasStarted: boolean;
}

const SoundControl: React.FC<SoundControlProps> = (hasStarted) => {
    const firstTrackPath = '/music/opening.ogg';
    const secondTrackPath = '/music/main.ogg';
    const fadeDuration = 3000;
    const initialDelay = 10000;

    const [isMuted, setIsMuted] = useState(false);
    const firstTrack = useRef(new Audio(firstTrackPath));
    const secondTrack = useRef(new Audio(secondTrackPath));

    const toggleMute = () => {
        const newMutedState = !isMuted;
        firstTrack.current.muted = newMutedState;
        secondTrack.current.muted = newMutedState;
        setIsMuted(newMutedState);
    };


    useEffect(() => {
        firstTrack.current.play();
        setTimeout(() => { firstTrack.current.pause(); }, initialDelay);
        setTimeout(() => { secondTrack.current.play(); }, initialDelay - 1500);

        return () => {
            firstTrack.current.pause();
            secondTrack.current.pause();
        };
    }, [hasStarted]);

    return (
        <div className="fixed top-0 right-0 p-4 cursor-pointer" onClick={toggleMute} style={{ zIndex: 1000 }}>
            {isMuted ? (
                <img src={muteImg} alt="Muted" style={{ width: '48px' }} />
            ) : (
                <img src={voiceImg} alt="Voice" style={{ width: '48px' }} />
            )}
        </div>
    );
};

export default SoundControl;
