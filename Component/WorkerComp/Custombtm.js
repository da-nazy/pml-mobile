import React,{useState,useRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
export default function Custombtm({displayComp,operation}){
    const btmRef=useRef(null);
    
    if(operation){
       btmRef.current.open();
    }else{
        btmRef.current.close();
    }
return(
    <RBSheet
    dragFromTopOnly={false}
    ref={btmRef}
    closeOnDragDown={true}
    closeOnPressMask={true}
    openDuration={12}

    height={Dimensions.get('screen').height}
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