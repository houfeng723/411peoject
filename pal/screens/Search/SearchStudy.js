import { SearchBar, Button } from 'react-native-elements';

import React, {useState} from 'react';
import { View } from 'native-base';
import FilterPage from './FilterPage';
import { Modal } from 'react-native';
const MultiSearch = ({navigation}) => {
  const [search, setSearch] = useState("");
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState(false);
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

  const modal = (
    <Modal
        animationType="slide"
        transparent={false}
        visible={showModal}
        onRequestClose={() => {
            setShowModal(false);
        }}>
        <FilterPage closeModal={()=>setShowModal(false)}></FilterPage>
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
    </View>
    );
}

export default MultiSearch;