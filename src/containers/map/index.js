import React from 'react'
import { StyleSheet } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { get } from 'lodash'
import mapApi from 'api/mapApi';

const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 }

export default class MapContainer extends React.Component {

  fitMarkers (coordinate) {
    if (this.map) {
      this.map.fitToCoordinates([coordinate], {
        edgePadding: DEFAULT_PADDING,
        animated: true
      })
    }
  }

  state = {
    location: null,
    address: null
  }

  renderMarker () {
    if (this.state.location) {
      this.fitMarkers(this.state.location)
      return <Marker coordinate={this.state.location} title={this.state.address} />
    }
  }

  async componentDidMount () {
    const address = get(this.props, 'navigation.state.params.address', null)
    if (address) {
      const location = await mapApi.getLocation(address)
      this.setState({ location, address })
    }
    
  }

  render () {
    return (
      <MapView
        ref={ref => {
          this.map = ref
        }}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
      >
        {this.renderMarker()}
      </MapView>
    )
  }
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
})
