import * as React from 'react';
import{TextInput} from 'react-native-paper';
import { AppColor } from './AppColor';
export default function InputComp({right,mode,label,placeholder,style,error,setText,secureText,editable,pointerEvents,value,disabled,keyboardType}){

    // mode : flat,outlined
    // label outlined input
    // placeholder
    //right={<TextInput.Affix text="/100" />}

    /**
     * theme={{
         colors: {
                    placeholder: 'white', text: 'white', primary: 'white',
                    underlineColor: 'transparent', background: '#003489'
            }
      }}
     */

    return(
        <TextInput
        disabled={disabled}
        scrollEnabled={true}
        selectionColor={AppColor.third}
        mode={mode}
        value={value}
        label={label}
        placeholder={placeholder}
        right={right}
        style={style}
        error={error}
        onChangeText={(e)=>setText(e)}
        secureTextEntry={secureText}
        editable={editable}
        pointerEvents={pointerEvents}
        keyboardType={keyboardType&&keyboardType}
    
     theme={{
         colors: {
               primary:`${AppColor.third}`,
                  
            }
      }}
      />
    )
}