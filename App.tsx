import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageSourcePropType,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const insets = useSafeAreaInsets();
  const [qty, setQty] = useState(1);

  const pricePerItem = 10000;
  const totalPrice = qty * pricePerItem;

  // URL bendera Indonesia
  const flagUrl = 'https://flagcdn.com/w40/id.png';

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        <ImageHeader />

        <View style={styles.section}>
          {/* === Country Row === */}
          <View style={styles.countryRow}>
            <Image
              source={{ uri: flagUrl }}
              style={styles.flag}
              resizeMode="cover"
            />
            <Text style={styles.countryText}>Indonesia</Text>
          </View>

          <Text style={styles.sectionTitle}>Discover the Beauty of Bali</Text>

          <View style={styles.reviewCard}>
            <Image
              source={require('./assets/avatar.jpeg')}
              style={styles.avatar}
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.reviewAuthor}>By Meutya Syahra</Text>
              <Text style={styles.reviewText}>
                Wow amazing yahh, best experience in my life very very worth it!
                Very good, very well.
              </Text>
            </View>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.subTitle}>Recommendation in Bali</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 12 }}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          >
            <RecommendationCard
              title="Ubud Palace Tour"
              subtitle="Complimentary pick-up"
              img={require('./assets/ubudPalace.jpeg')}
            />
            <RecommendationCard
              title="Ubud Art Market"
              subtitle="Tips & Info for Shopping for Art in Ubud"
              img={require('./assets/ubudArtMarket.jpeg')}
            />
          </ScrollView>
        </View>
      </ScrollView>

      {/* === Bottom Bar === */}
      <LinearGradient
        colors={['#1E3C72', '#2A5298', '#FF7043']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}
      >
        {/* Counter */}
        <View style={styles.qtyRow}>
          <TouchableOpacity
            onPress={() => setQty(Math.max(1, qty - 1))}
            style={styles.qtyBtn}
          >
            <Text style={styles.qtyBtnText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.qtyText}>{qty}</Text>

          <TouchableOpacity
            onPress={() => setQty(qty + 1)}
            style={styles.qtyBtn}
          >
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Price Info */}
        <View style={styles.priceContainer}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.priceText}>
            ${totalPrice.toLocaleString('en-US')}
          </Text>
        </View>

        {/* Book Button */}
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

function ImageHeader() {
  return (
    <ImageBackground
      source={require('./assets/header.jpeg')}
      style={styles.header}
      imageStyle={styles.headerImage}
    >
      <View style={styles.headerTop}>
        <TouchableOpacity style={styles.circleBtn}>
          <Text style={styles.chev}>{'<'}</Text>
        </TouchableOpacity>

        <View style={styles.weatherChip}>
          <Text style={styles.weatherText}>☀️ 24° C</Text>
        </View>
      </View>

      <View style={styles.headerBottom}>
        <View style={styles.rating}>
          <Text style={styles.star}>★</Text>
          <Text style={styles.ratingText}>5.0</Text>
        </View>

        <Text style={styles.title}>Bali</Text>
        <Text style={styles.desc}>
          From crystal-clear waters to breathtaking sunsets, Bali is calling!
          Explore hidden islands, swim with manta rays, and create memories that
          last a lifetime.
        </Text>
      </View>
    </ImageBackground>
  );
}

/** Recommendation Card */
type RecommendationCardProps = {
  title: string;
  subtitle: string;
  img: ImageSourcePropType;
};

function RecommendationCard({ title, subtitle, img }: RecommendationCardProps) {
  return (
    <View style={recStyles.card}>
      <Image source={img} style={recStyles.cardImage} />
      <View style={recStyles.cardContent}>
        <Text style={recStyles.cardTitle}>{title}</Text>
        <Text style={recStyles.cardSub}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F5F1EA' },
  header: { height: 340, justifyContent: 'space-between' },
  headerImage: { borderBottomLeftRadius: 18, borderBottomRightRadius: 18 },
  headerTop: {
    marginTop: 16,
    marginHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  circleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chev: { color: '#fff', fontSize: 20 },
  weatherChip: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  weatherText: { color: '#222', fontWeight: '600' },
  headerBottom: { paddingHorizontal: 20, paddingBottom: 20 },
  rating: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: { color: '#ffd54a', marginRight: 6, fontSize: 14 },
  ratingText: { color: '#fff', fontWeight: '700' },
  title: { color: '#fff', fontSize: 34, fontWeight: '800', marginTop: 12 },
  desc: {
    color: '#fff',
    marginTop: 8,
    opacity: 0.95,
    fontSize: 13,
    maxWidth: '92%',
  },
  section: { paddingHorizontal: 16, paddingTop: 18 },
  countryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  flag: {
    width: 24,
    height: 16,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: '#ccc',
    backgroundColor: '#E64A19',
  },
  countryText: { color: '#333', marginLeft: 8, fontSize: 15 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 6,
    color: '#111',
  },
  reviewCard: {
    marginTop: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  avatar: { width: 44, height: 44, borderRadius: 22 },
  reviewAuthor: { fontWeight: '700', color: '#333' },
  reviewText: { color: '#666', marginTop: 6, fontSize: 12 },
  viewAllButton: {
    backgroundColor: '#F3EBD9',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginLeft: 12,
  },
  viewAllText: { color: '#333', fontWeight: '600' },
  subTitle: { fontSize: 16, fontWeight: '700', marginTop: 18, color: '#111' },

  // === Fixed Bottom Bar ===
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  qtyBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FF7043',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyBtnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  qtyText: {
    color: '#fff',
    fontWeight: '700',
    marginHorizontal: 10,
    fontSize: 16,
  },
  priceContainer: { flex: 1, marginLeft: 12 },
  totalLabel: { color: '#f5f5f5', fontSize: 12 },
  priceText: { color: '#fff', fontWeight: '800', fontSize: 18 },
  bookButton: {
    backgroundColor: '#FF7A5A',
    paddingVertical: 12,
    paddingHorizontal: 26,
    borderRadius: 999,
    elevation: 3,
  },
  bookButtonText: { color: '#fff', fontWeight: '800', fontSize: 15 },
});

const recStyles = StyleSheet.create({
  card: {
    width: 260,
    backgroundColor: '#fff',
    borderRadius: 14,
    marginRight: 14,
    overflow: 'hidden',
    elevation: 2,
  },
  cardImage: { width: '100%', height: 120 },
  cardContent: { padding: 12 },
  cardTitle: { fontWeight: '800', fontSize: 14, color: '#111' },
  cardSub: { color: '#777', marginTop: 6, fontSize: 12 },
});

export default App;
