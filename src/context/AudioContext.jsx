import { createContext, useEffect, useState } from "react";
import tracksList from "../assets/tracksListLic";

const audio = new Audio();

export const AudioContext = createContext({});

const AudioProvider =({children})=>{
    const [currentTrack,setCurrentTrack] = useState(tracksList[0]);
    const [isPlaying,setPlaying] = useState(false);

    useEffect(() => {
        const handleStopAudio = () => {
            audio.pause();
            setPlaying(false);
        };
    
        audio.addEventListener("ended", handleStopAudio);
    
        return () => {
            audio.removeEventListener("ended", handleStopAudio);
        };
      }, []);
    
    const nextTrack = (track) =>{
        if(track.id!==tracksList.length){
            handleToggleAudio(tracksList[track.id]);
        }
        else{
            handleToggleAudio(tracksList[0]);
        }
    }
    const previousTrack = (track) =>{
        if(track.id!==1){
            handleToggleAudio(tracksList[track.id-2]);
        }
        else{
            handleToggleAudio(tracksList[tracksList.length-1]);
        }
         
    }
    const handleToggleAudio = (track) => {
        if(currentTrack.id!==track.id){
            setCurrentTrack(track);
            setPlaying(true);

            audio.src = track.src;
            audio.currentTime = 0;
            audio.play();

            return;
        }

        if(isPlaying){
            audio.pause();
            setPlaying(false);
        }
        else{
            audio.play();
            setPlaying(true);
        }
    };

    const value = {audio, currentTrack, isPlaying, handleToggleAudio, nextTrack, previousTrack};

    return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
}

export default AudioProvider;