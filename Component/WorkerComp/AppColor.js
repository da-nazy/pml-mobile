
export const AppColor={
    primary:'#000',
    secondary:'#433E91',
    third:'#F38640',
    forth:'#fff',
    green:'#05CC47',
    lightThird:'#FEE4A8',
    lightThird1:'#F5893F',
    fifth:'#14125A',
    sixth:"#5A4BD9",
    transThird:'#FDAF8E',
    error:'#8A0505'
}
/**
 * export const OutPut=(e)=>{
  e
}
 */
export const regX={
    phoneFilter:/^\d{11}$/,
    emailFilter:/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    numberFilter:/^[0-9]+$/
}

export const numberCheck=(e)=>{
    if(regX.numberFilter.test(e)){
        return true;
    }else{
        ("Not a number");
        return false;
    }
} 
export const emailCheck=(e)=>{
  if(regX.emailFilter.test(e)){
      return true;
  }
}

export const phoneCheck=(e)=>{
    if(regX.phoneFilter.test(e)){
        return true;
    }
}
