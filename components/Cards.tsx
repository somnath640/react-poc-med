import React from 'react'
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Cards = ({ type = "general", colorClass = '', header = '', subheader = '', actionType = '', textColor = "text-white", description ='', address='', footer='' }) => {
  return (
    <View className={`${colorClass} h-auto w-full rounded-md mt-4 p-4 flex-row justify-between items-center border ${type === 'followUp' ? 'border-red-600' : ''}`}>
      {type === "general" && <><View>
        <Text className={`${textColor}`}>{subheader}</Text>
        <Text className={`${textColor}`}>{header}</Text>
      </View>
        <TouchableOpacity className='bg-transparent'>
          <Text className={`${textColor}`}>{actionType}</Text>
        </TouchableOpacity></>}
      {type === "followUp" && <><View className="mb-2">
  <View className="flex-row items-center justify-between gap-2">
     <Text className={`${textColor} text-base font-semibold w-2/3`}>
    {header}
  </Text>
    <Pressable
      className="bg-red-600 px-2 py-1 rounded-md"
      onPress={() => console.log("Button pressed")}
    >
      <Text className="text-white text-xs font-bold">{actionType}</Text>
    </Pressable>
  </View>
  <Text className="mt-1 text-sm text-gray-700">{description}</Text>
  {address.length > 0 && <Text className="mt-1 text-sm text-gray-700">{address}</Text>}
  {footer.length > 0 && <Text className="mt-1 text-sm text-gray-700">{footer}</Text>}
</View>


      </>}
      {type === "topPerformer" && <><View className="mb-2">
  <View className="flex-row items-center justify-between gap-2">
     <Text className={`${textColor} text-base font-semibold w-2/3`}>
    {header}
  </Text>
  </View>
  <Text className="mt-1 text-sm text-gray-700">{description}</Text>
</View>


      </>}
    </View>
  )
}

export default Cards

const styles = StyleSheet.create({})