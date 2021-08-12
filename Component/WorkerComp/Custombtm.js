import React,{useState,useRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { AppColor } from './AppColor';
export default function Custombtm({displayComp,cod,copm,btmRef,height}){
    
return(
    <RBSheet
    dragFromTopOnly={false}
    ref={btmRef}
    closeOnDragDown={cod}
    closeOnPressMask={copm}
    openDuration={12}
    height={height}
    customStyles={{
        wrapper: {
            backgroundColor: "transparent"
        },
        draggableIcon: {
            backgroundColor:`${AppColor.third}`
        },
        container: {
            backgroundColor: '#fff',
            marginBottom: 20
        }
    }}
>
    {displayComp()}
    
   </RBSheet>
)
}