import React from 'react';
import {View,Text} from 'react-native';
import {IconComp} from '../WorkerComp/ExternalFunction';

export default function Track(){
    //Should get the code from route params
    return(
        <View>
           <View>{IconComp()}</View> 

        </View>
    )
}