import React, { useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
export default function PickImage({
	setImageUri,
	setImageBase64,
	type,
	setError,
	setPickImage,
}) {
	// useEffect works when result has been gotten second called
	useEffect(() => {
		(async () => {
			if (Platform.OS !== 'web') {
				const { status } =
					await ImagePicker.requestMediaLibraryPermissionsAsync();
				if (status !== 'granted') {
					alert('Sorry, we need camera roll permissions to make this work!');
				}
			}
		})();
	}, []);

	// first called
	const pickImage = async () => {
		console.log('pickImage');
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
			base64: true,
		});

	

		// third called
		if (!result.cancelled) {
			setImageUri(result.uri,false);

			// passing the uri to be encoded
			//console.log(result.base64);
		//	console.log(result.uri);
		//	console.log(result.uri.split('.')[3]);
		console.log(result)
		   var type=result.uri.split('.')[3];
			setImageBase64(result.base64, false,type);
	     
			
		
		} else {
			setError(false, 'Canclled');
		}
	};
	pickImage();
	return null;
}
