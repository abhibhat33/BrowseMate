import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, setPage } from '../redux/itemSlice';
import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const { data, status, error, currentPage } = useSelector((state) => state.items);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortByPrice, setSortByPrice] = useState(null);

  // Fetch items whenever the current page changes
  useEffect(() => {
    dispatch(fetchItems({ page: currentPage }));
  }, [dispatch, currentPage]);

  // Logout function to sign out user and remove login state
  const handleLogout = useCallback( async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem('isLoggedIn'); // Clear stored login state
      navigation.replace('Login'); // Redirect to login screen
    } catch (error) {
      Alert.alert("Can't logout at this moment, please try again later");
      console.error('Logout error:', error);
    }
  }, [navigation]);

  // Set logout button in the header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="Logout" onPress={handleLogout} color="red" />, // Logout button in header
    });
  }, [navigation, handleLogout]);

  // Filter items based on search query
  let filteredItems = data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sorting logic: ascending or descending by price
  if (sortByPrice) {
    filteredItems.sort((a, b) =>
      sortByPrice === 'asc' ? a.price - b.price : b.price - a.price
    );
  }

  return (
    <View style={styles.container}>
      {/* Search Bar with Clear Button */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search products by title..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
            <Icon name="close-circle" size={20} color="gray" />
          </TouchableOpacity>
        )}
      </View>

      {/* Sorting Filter */}
      <View style={styles.sortContainer}>
        <TouchableOpacity
          onPress={() => setSortByPrice((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
          style={styles.sortButton}
        >
          <Text>{sortByPrice === 'asc' ? 'Sort: High to Low ↓' : 'Sort: Low to High ↑'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSortByPrice(null)} style={styles.sortButton}>
          <Text>Clear Sort</Text>
        </TouchableOpacity>
      </View>

      {/* Loading & Error Handling */}
      {status === 'loading' && <ActivityIndicator size="large" />}
      {status === 'failed' && <Text>Error: {error}</Text>}

      {/* Product List Display */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Details', { item })}>
            <Image source={{ uri: item.thumbnail }} style={styles.image} />
            <View style={styles.itemDetails}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>Category: {item.category}</Text>
              <Text style={styles.price}>Price: ${item.price}</Text>
            </View>
            <Icon name="chevron-forward" size={30} color="gray" style={styles.arrowIcon} />
          </TouchableOpacity>
        )}
      />

      {/* Pagination Controls */}
      <View style={styles.pagination}>
        <Button title="Prev" onPress={() => dispatch(setPage(currentPage - 1))} disabled={currentPage === 1} />
        <Text>Page {currentPage}</Text>
        <Button title="Next" onPress={() => dispatch(setPage(currentPage + 1))} />
      </View>
    </View>
  );
}

// Styles for UI components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    padding: 8,
  },
  clearButton: {
    padding: 5,
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  sortButton: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 5,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
  },
  arrowIcon: {
    marginLeft: 'auto',
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    color: 'gray',
  },
  price: {
    color: 'green',
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
