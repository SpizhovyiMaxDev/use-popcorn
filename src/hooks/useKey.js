import { useEffect } from "react";

export default function useKey(key, action){
    useEffect(function(){
        function handlePressKey(e){
          if(e.key.toLowerCase() === key.toLowerCase()){
            action()
          }
        }
    
        document.addEventListener('keydown', handlePressKey)
    
        return function(){
          document.removeEventListener('keydown', handlePressKey)
        }
    
       }, [action, key]);
}