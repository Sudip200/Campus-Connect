import { NextResponse,NextRequest } from "next/server";
let BASE_URL = process.env.API_BASE_URL;

export async function middleware(req:NextRequest){
    try{
    console.log('inside middleware')
    let token = req.cookies.get('Authorization')?.value;
    if(!token){
         return NextResponse.redirect(new URL('/signin/',req.url));
    }
   console.log(req.url)
   let response = await fetch(`${BASE_URL}/v1/user/me`,{
    credentials:'include',
    headers:{
        'authorization':token
    }
   });
   let data =  await response.json();
   console.log(data)
   let retrivedRole = data.user.role;
   let pathName = new URL(req.url).pathname
   switch(retrivedRole){
       case 'student':{  
        if(!pathName.startsWith('/dashboard/student')){
                  return NextResponse.redirect(new URL('/dashboard/student',req.url));
           }
           break;   
       }
       case 'faculty':{
           if(!pathName.startsWith('/dashboard/faculty')){
                  return NextResponse.redirect(new URL('/dashboard/faculty',req.url));
           }
           break; 
       }
       case 'admin':{
        if(!pathName.startsWith('/dashboard/admin')){
                 return NextResponse.redirect(new URL('/dashboard/admin',req.url));
           }
           break;      
       }
       default:{
           return NextResponse.redirect(new URL('/signin/',req.url));
       }
   }
}catch(err){
    console.log(err)
    return NextResponse.redirect(new URL('/signin/',req.url));
}
}
export const config ={
    matcher:['/dashboard/:path*']
}