use Node v18.19.0

for build IOS

rename metro.config.js --> metro.configjs
to build 
    execute: npm run ios
        when you see this error  ""#error unsupported Swift architecture ^ unsupported Swift architecture  #endif ""
    open the project with xcode 
    and go to Product --> destination -> and choose some simulator(Roseta..)
    and create a build.