import React from 'react'
import { View } from 'native-base'
import Swiper from 'react-native-swiper'
import { Dimensions, FlatList } from 'react-native'
import { get, concat, isEqual, filter, clone, includes, lowerCase } from 'lodash'

import Row from './row-item'
import RowAdd from './row-add'
import connectAutoDispatch from '../../../@redux/connect';
import { onCompanySelected } from '../../../@redux/actions/companyAction'

class CompanyFollow extends React.PureComponent {
  
  constructor (props) {
    super(props)
    this.state = {
      size: (Dimensions.get('window').width - 16) / 3
    }
  }

  getData = () => {
    const textSearch = lowerCase(this.props.textSearch)
    let ls = clone(this.props.list)
    if (textSearch) {
      ls = filter(clone(this.props.list), ({name}) => `${lowerCase(name)}`.indexOf(textSearch) >= 0)
    }
    return concat({ id: -100 }, ls)
  }

  onLayout = () => {
    this.setState({ size: (Dimensions.get('window').width - 48) / 3 })
  }

  // componentWillReceiveProps (nextProps) {
  //   if (!isEqual(nextProps.list, this.props.list)) {
  //     this.setState({list: concat({ id: -100 }, nextProps.list)})
  //   }
  // }

  handleCompanySelected = (company, index) => {
    this.props.onCompanySelected(company)
    this.props.onNavigateCompany('companyDetail', company )
  }

  render () {
    return (
      // <Swiper
      //   style={[this.props.style]}
      //   onLayout={this.onLayout}
      //   height={(this.props.size * 3) / 2}
      // >
      //   <View
      //     style={{ flexDirection: 'row', paddingLeft: 12, paddingRight: 12 }}
      //   >
      //     <RowAdd
      //       source={require('../../../images/home/img3.png')}
      //       size={this.state.size}
      //     />
      //     <Row
      //       title='ISOFT GLOBE'
      //       source={require('../../../images/home/diana_card_1.png')}
      //       size={this.state.size}
      //     />
      //   </View>
      // </Swiper>
      <FlatList 
        keyExtractor={({id}) => `${id}` }
        style={{ paddingLeft: 12, paddingRight: 12 }}
        horizontal={true}
        data={this.getData()}
        renderItem={({item, index}) => index === 0 ? 
        <RowAdd size={this.state.size} key={`${index}`} onPress={() => this.props.onNavigateCompany('addCompany', item) }/> 
        : <Row key={`${index}`}
            phone={item.phone}
            title={item.name}
            image={item.image}
            style={{marginLeft: 4}}
            size={this.state.size}
            onPress={() => this.handleCompanySelected(item, index)}/>}
      />
    )
  }
}

export default connectAutoDispatch(state => ({
  list: get(state, 'company.companyFollow', [])
}), {
  onCompanySelected
})(CompanyFollow)