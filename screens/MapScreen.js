import React, {useEffect, useContext } from 'react'
import styled from 'styled-components'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Image, SafeAreaView, FlatList, TouchableOpacity, Alert, ScrollView } from 'react-native'

const mapDarkStyle=[
      [
            {
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#212121"
                }
              ]
            },
            {
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#212121"
                }
              ]
            },
            {
              "featureType": "administrative",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "administrative.country",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9e9e9e"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative.locality",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#bdbdbd"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#181818"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#1b1b1b"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#2c2c2c"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#8a8a8a"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#373737"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#3c3c3c"
                }
              ]
            },
            {
              "featureType": "road.highway.controlled_access",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#4e4e4e"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "featureType": "transit",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#000000"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#3d3d3d"
                }
              ]
            }
          ]
]

const mapStandardStyle = [
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
    ];
    

export default function MapScreen() {
      const initialRegion ={ 
            latitude: 6.457060,
            longitude: 3.212420,
            latitudeDelta: 0.0422678,
            longitudeDelta: 0.049887,
          }
      return (
                  <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        initialRegion={initialRegion}
                        //customMapStyle={ theme.dark ? mapDarkStyle : mapStandardStyle}
                        >
                      <Marker 
                        coordinate={{
                              latitude: 6.457060,
                              longitude: 3.212420,
                        }}
                        image={require('../assets/map_marker.png')}
                        title="Test Title"
                        description="This is the test description"
                      />  
                  </MapView>
     
       );
};

const styles = StyleSheet.create({
      map: {
            height: '100%'
          },
          // Callout bubble
          bubble: {
            flexDirection: 'column',
            alignSelf: 'flex-start',
            backgroundColor: '#fff',
            borderRadius: 6,
            borderColor: '#ccc',
            borderWidth: 0.5,
            padding: 15,
            width: 150,
          },
          // Arrow below the bubble
          arrow: {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            borderTopColor: '#fff',
            borderWidth: 16,
            alignSelf: 'center',
            marginTop: -32,
          },
          arrowBorder: {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            borderTopColor: '#007a87',
            borderWidth: 16,
            alignSelf: 'center',
            marginTop: -0.5,
            // marginBottom: -15
          },
          // Character name
          name: {
            fontSize: 16,
            marginBottom: 5,
          },
          // Character image
          image: {
            width: "100%",
            height: 80,
          },
     });
