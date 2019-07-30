import React from 'react'
import { View } from 'native-base'
import Swiper from 'react-native-swiper'
import { Dimensions, FlatList } from 'react-native'
import { get, concat, isEqual, filter, clone, includes, lowerCase } from 'lodash'

import RowItem from './row-item'
import RowAdd from './row-add'
import connectAutoDispatch from '@redux/connect';

class ProjectFollow extends React.Component {
  
  constructor (props) {
    super(props)
    this.state = {
      size: (Dimensions.get('window').width - 16) / 3,
    }
  }

  onLayout = () => {
    this.setState({ size: (Dimensions.get('window').width - 48) / 3 })
  }

  // componentWillReceiveProps (nextProps) {
  //   if (!isEqual(nextProps.list, this.props.list)) {
  //     this.setState({list: concat({ id: -100 }, nextProps.list)})
  //   }
  // }

  getData = () => {
    const textSearch = lowerCase(this.props.textSearch)
    let ls = clone(this.props.list)
    if (textSearch) {
      ls = filter(clone(this.props.list), ({name}) => `${lowerCase(name)}`.indexOf(textSearch) >= 0)
    }
    return concat({ id: -100 }, ls)
  }

  render () {
    return (
      <FlatList 
        keyExtractor={({id}) => `${id}` }
        style={{ paddingBottom: 16, height: this.props.size * 3 / 2, paddingLeft: 12, paddingRight: 12 }}
        horizontal={true}
        data={this.getData()}
        renderItem={({item, index}) => index === 0 ? 
          <RowAdd 
            size={this.state.size}
            key={`${index}`}
            onPress={() => this.props.onNavigateProject('addProject') }
            /> 
          : 
          <RowItem
            key={`${index}`}
            size={this.state.size} 
            {...item}
            onPress={() => this.props.onNavigateProject('proDetails', item )}
            />
        }
      />
    )
  }
}

export default connectAutoDispatch(state => ({
  list: state.project.followProjects
}), {
})(ProjectFollow)