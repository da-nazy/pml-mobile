export const AppColor={
    primary:'#000',
    secondary:'#433E91',
    third:'#F38640',
    forth:'#fff',
    green:'#05CC47',
}
/**
 * export const OutPut=(e)=>{
  e
}
 */
export const regX={
    phoneFilter:/^\d{11}$/,
    emailFilter:/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,

}
export const emailCheck=(e)=>{
  if(regX.emailFilter.test(e)){
      return true;
  }else{
      console.log("email check false")
  }
}

export const phoneCheck=(e)=>{
    if(regX.phoneFilter.test(e)){
        return true;
    }else{
        console.log("phone check false");
    }
}
