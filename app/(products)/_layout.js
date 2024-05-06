import {Stack} from 'expo-router'
import CustomHeader from '../../Components/CustomHeader'

export default function Layout () { 
    return (    
        <Stack>
            <Stack.Screen 
            name="Home" options={{
                        header: () => <CustomHeader /> 
                        }}
                     /> 

        </Stack>
    )
  

}