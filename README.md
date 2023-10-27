# Introduction 
This is the mobile companion app for the fire door data solution 

# Getting Started
You will need to install the expo-cli by running the following command `sudo npm install expo-cli --global`

You will need to clone the git repository. It is recommended to use http and a PAT to authenticate with the devops remote repository. It is possible that you already have a PAT as it is part of the FDD VM onboarding process. This PAT can be found in the remote url of the FDD repository on your VM. Alternatively you can create a new one.
``` 
https://SASManagedApps:PAT_TOKEN_HERE@dev.azure.com/SASManagedApps/FDD/_git/DDS-Mobile
```

You will need to forward ports 19000, 19001, 19002
Setting up environment variables edit the file ~/.bashrc and add the following lines where 192.168.1.184 should be the ip address of your main PC.
```
export EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
export REACT_NATIVE_PACKAGER_HOSTNAME=192.168.1.184
```
For you to be able to launch the app in an emulator or a phone using expo, the emulator or the phone and your main PC must be able to communicate with each other (same network)
