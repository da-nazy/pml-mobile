import * as React from 'react';
import{TextInput} from 'react-native-paper';
export default function InputComp({right,mode,label,placeholder,style,error,setText,secureText}){

    // mode : flat,outlined
    // label outlined input
    // placeholder
    //right={<TextInput.Affix text="/100" />}

    return(
        <TextInput
        mode={mode}
        label={label}
        placeholder={placeholder}
        right={right}
        style={style}
        error={error}
        onChangeText={(e)=>setText(e)}
        secureTextEntry={secureText}
      />
    )
}