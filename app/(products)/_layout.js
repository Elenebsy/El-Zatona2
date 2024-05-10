import {Stack} from 'expo-router'
import CustomHeader from '../../Components/CustomHeader'
import { Tabs } from 'expo-router';
import { searchItems , searchQuery , setSearchQuery } from './index';

import { useState } from 'react';
export default function Layout () { 

    

    return (    
        <Stack>
        <Stack.Screen
          name="index"
          options={{
            header: () => (
              <CustomHeader
              
              />
            ),
          }}
        />
      </Stack>
        
        
    )
  

}
