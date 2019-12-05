import { SearchBar, Button } from 'react-native-elements';

import React, {useState} from 'react';
import { joinStudyEvent } from '../../service/api_service';
import { View, CardItem, H3, Card, Text, Body, Left,Right, Icon, Content} from 'native-base';
import FilterPage from './FilterPage';
import { Modal, ScrollView, TouchableOpacity } from 'react-native';
const MultiSearch = ({navigation}) => {
  const [search, setSearch] = useState("");
  const [list, setList] = useState(null);
  const [showModal, setShowModal] = useState(false);

  let child = null;
  if(list !== null ) {
    child = list.map((each, index) => {
      console.log(each);
      console.log("list each");
      return (
        <TouchableOpacity key={index}>
          <Card container>
            <CardItem header>
              <Left>
                <H3> {each.subject + " " + each.courseNumber}</H3>
              </Left>
              <Right>
                <Button
                  type="outline"
                  raised
                  iconRight
                  iconContainerStyle={{marginLeft:10}}
                  icon={{
                          name:'plus',
                          type:'antdesign',
                  }}
                  title="Join!"
                  onPress={() => joinStudyEvent(each.studygroupid)}
                />
              </Right>
            </CardItem>
            <CardItem cardBody>
                <Icon name="map" style={{left:20}}></Icon>
                <Text style={{left:25}}> {`Location : ${each.location}`}</Text>
            </CardItem>
            <CardItem footer>
              <Left>
                <Text> {each.time} </Text>
              </Left>
              <Right>
                <Text>{"Host : " + each.id}</Text>
              </Right>
            </CardItem>
          </Card>
  
        </TouchableOpacity>
      )
  
  
  
    })
    if(child.length === 0) {
      child = <Text>
        No Study Events Matched 
      </Text>
    }
  }

  const modal = (
    <Modal
        animationType="slide"
        transparent={false}
        visible={showModal}
        onRequestClose={() => {
            setShowModal(false);
        }}>
        <FilterPage setList={(obj) => setList(obj)} closeModal={()=>setShowModal(false)}></FilterPage>
    </Modal>);
    return (
    <View>  
      <SearchBar
        lightTheme
        round
        placeholder="Type Here..."
        onChangeText={setSearch}
        value={search}
      />
      <Button
        title="show filter"
        type="clear"
        onPress={()=>setShowModal(true)}
        icon={{
          name:"filter",
          type:"antdesign"
        }}/>
        {modal}
        <ScrollView >
          <Content padder>
            {child}
          </Content>
        </ScrollView>
    </View>
    );
}

export default MultiSearch;


  // Subject: 'cs',
  // CourseNumber: 411,
  // Time: 'Oct 31',
  // Location : 'Grainger',
  // info: null,
  // returnID: null,
  // returnSubject: null,
  // returnCourseNumber: null,
  // returnTime: null,
  // returnLocation: null,