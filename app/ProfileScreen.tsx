import React, { useState } from 'react';
import { ScrollView, Dimensions, Modal, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {
  Box,
  Text,
  VStack,
  HStack,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Image,
  Icon,
  Badge,
  BadgeText,
  BadgeIcon,
  Button,
  ButtonText,
  ButtonIcon,
  Pressable,
  Input,
  InputField,
} from '@gluestack-ui/themed';
import {
  MapPin,
  Heart,
  Share2,
  Grid3x3,
  Mail,
  Phone,
  Award,
  TrendingUp,
  Camera,
  Edit,
  Users,
  X,
  EyeOff,
  Star,
} from 'lucide-react-native';
import StatsCard from '../components/StatsCard';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(2500);
  const [email, setEmail] = useState('david.rangel@example.com');
  const [phone, setPhone] = useState('+52 449 123 4567');
  const [editMode, setEditMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [likes, setLikes] = useState<{ [key: string]: boolean }>({});
  const [activeTab, setActiveTab] = useState<'galeria' | 'likeadas' | 'ocultas'>('galeria');
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  const galleryImages: string[] = [
    'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400',
    'https://images.unsplash.com/photo-1682687221038-404cb8830901?w=400',
    'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=400',
    'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=400',
    'https://images.unsplash.com/photo-1682687220067-dced9a881b56?w=400',
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400',
  ];

  const hiddenImages = [
    'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400',
  ];

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
    setFollowers(f => (isFollowing ? f - 1 : f + 1));
  };

  const handleLike = (url: string) => {
    setLikes(prev => ({
      ...prev,
      [url]: !prev[url],
    }));
  };

  // 📸 Nueva función: abrir cámara o galería
  const handleAvatarChange = async (useCamera = false) => {
    try {
      const permission = useCamera
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permission.status !== 'granted') {
        Alert.alert('Permiso requerido', 'Se necesita acceso a la cámara o galería.');
        return;
      }

      const result = useCamera
        ? await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.8 })
        : await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.8 });

      if (!result.canceled) {
        setAvatarUri(result.assets[0].uri);
      }
    } catch (err) {
      console.error('Error al abrir la cámara o galería:', err);
    }
  };

  const getDisplayedImages = () => {
    if (activeTab === 'likeadas') {
      return galleryImages.filter(url => likes[url]);
    }
    if (activeTab === 'ocultas') {
      return hiddenImages;
    }
    return galleryImages;
  };

  return (
    <Box flex={1} bg="#1a1a1a">
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space="md">
          {/* HEADER */}
          <Box
            bg="#2d2d2d"
            pt="$8"
            pb="$6"
            px="$5"
            borderBottomLeftRadius="$3xl"
            borderBottomRightRadius="$3xl"
          >
            <VStack space="lg" alignItems="center">
              {/* AVATAR */}
              <Box position="relative">
                <Avatar size="2xl" borderWidth={4} borderColor="#10b981">
                  <AvatarFallbackText>David Rangel</AvatarFallbackText>
                  <AvatarImage
                    source={{
                      uri:
                        avatarUri ||
                        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
                    }}
                  />
                </Avatar>

                {/* Botón de cámara (presionar = cámara / mantener = galería) */}
                <Pressable
                  position="absolute"
                  bottom={0}
                  right={0}
                  bg="#10b981"
                  p="$2"
                  borderRadius="$full"
                  borderWidth={3}
                  borderColor="#2d2d2d"
                  onPress={() => handleAvatarChange(true)}
                  onLongPress={() => handleAvatarChange(false)}
                >
                  <Icon as={Camera} color="white" size="sm" />
                </Pressable>
              </Box>

              {/* NOMBRE Y UBICACIÓN */}
              <VStack space="xs" alignItems="center">
                <Text color="white" fontSize="$2xl" fontWeight="$bold">
                  David Rangel
                </Text>
                <HStack space="xs" alignItems="center">
                  <Icon as={MapPin} color="#10b981" size="sm" />
                  <Text color="#d1d5db" fontSize="$sm">
                    Aguascalientes, MX
                  </Text>
                </HStack>
                <Badge action="success" variant="solid" size="md" bg="#10b981" mt="$2">
                  <BadgeIcon as={Award} mr="$1" />
                  <BadgeText color="white">Desarrollador Pro</BadgeText>
                </Badge>
              </VStack>

              {/* BOTONES */}
              <HStack space="md" mt="$3" width="100%">
                <Button
                  flex={1}
                  size="lg"
                  bg={isFollowing ? '#1a1a1a' : '#10b981'}
                  borderWidth={isFollowing ? 2 : 0}
                  borderColor={isFollowing ? '#10b981' : 'transparent'}
                  onPress={toggleFollow}
                >
                  <ButtonIcon as={isFollowing ? Users : Heart} color="white" mr="$2" />
                  <ButtonText color="white">
                    {isFollowing ? 'Siguiendo' : 'Seguir'}
                  </ButtonText>
                </Button>
                <Button size="lg" bg="#1a1a1a" borderWidth={2} borderColor="#10b981">
                  <ButtonIcon as={Mail} color="#10b981" />
                </Button>
                <Button size="lg" bg="#1a1a1a" borderWidth={2} borderColor="#10b981">
                  <ButtonIcon as={Share2} color="#10b981" />
                </Button>
              </HStack>
            </VStack>
          </Box>

          {/* STATS */}
          <HStack space="md" px="$5" mt="$2">
            <StatsCard icon={Grid3x3} value="156" label="Posts" color="#10b981" />
            <StatsCard
              icon={Users}
              value={`${followers.toLocaleString()}`}
              label="Seguidores"
              color="#10b981"
            />
            <StatsCard icon={TrendingUp} value="89%" label="Engagement" color="#10b981" />
          </HStack>

          {/* INFO EDITABLE */}
          <Box bg="#2d2d2d" mx="$5" p="$5" borderRadius="$2xl">
            <HStack justifyContent="space-between" alignItems="center" mb="$3">
              <Text color="#10b981" fontSize="$lg" fontWeight="$bold">
                Sobre mí
              </Text>
              <Pressable onPress={() => setEditMode(!editMode)}>
                <Icon as={editMode ? X : Edit} color="#10b981" size="sm" />
              </Pressable>
            </HStack>
            <VStack space="md">
              <HStack space="md" alignItems="center">
                <Icon as={Mail} color="#10b981" size="md" />
                {editMode ? (
                  <Input flex={1} variant="underlined" borderColor="#10b981">
                    <InputField
                      color="white"
                      value={email}
                      onChangeText={setEmail}
                      placeholder="Correo"
                    />
                  </Input>
                ) : (
                  <Text color="white">{email}</Text>
                )}
              </HStack>
              <HStack space="md" alignItems="center">
                <Icon as={Phone} color="#10b981" size="md" />
                {editMode ? (
                  <Input flex={1} variant="underlined" borderColor="#10b981">
                    <InputField
                      color="white"
                      value={phone}
                      onChangeText={setPhone}
                      placeholder="Teléfono"
                    />
                  </Input>
                ) : (
                  <Text color="white">{phone}</Text>
                )}
              </HStack>
            </VStack>
          </Box>

          {/* GALERÍA */}
          <HStack px="$5" alignItems="center" justifyContent="center" mt="$3" mb="$2" space="lg">
            {[
              { key: 'galeria', label: 'Galería', icon: Grid3x3 },
              { key: 'likeadas', label: 'Likeadas', icon: Heart },
              { key: 'ocultas', label: 'Ocultas', icon: EyeOff },
            ].map(tab => (
              <Pressable key={tab.key} onPress={() => setActiveTab(tab.key as any)}>
                <VStack alignItems="center">
                  <Icon
                    as={tab.icon}
                    color={activeTab === tab.key ? '#10b981' : '#6b7280'}
                    size="md"
                  />
                  <Text
                    color={activeTab === tab.key ? '#10b981' : '#9ca3af'}
                    fontSize="$sm"
                    fontWeight={activeTab === tab.key ? '$bold' : '$normal'}
                  >
                    {tab.label}
                  </Text>
                </VStack>
              </Pressable>
            ))}
          </HStack>

          <Box px="$5">
            <VStack space="sm">
              {getDisplayedImages()
                .reduce<string[][]>((rows, url, i) => {
                  if (i % 3 === 0) rows.push([url]);
                  else rows[rows.length - 1].push(url);
                  return rows;
                }, [])
                .map((row, rowIndex) => (
                  <HStack key={rowIndex} space="sm">
                    {row.map((url, i) => (
                      <Pressable key={i} onPress={() => setSelectedImage(url)}>
                        <Image
                          source={{ uri: url }}
                          width={width / 3.5}
                          height={120}
                          borderRadius="$xl"
                          alt="img"
                        />
                      </Pressable>
                    ))}
                  </HStack>
                ))}
            </VStack>
          </Box>

          {/* MODAL DE IMAGEN */}
          <Modal visible={!!selectedImage} transparent animationType="fade">
            <Box flex={1} justifyContent="center" alignItems="center" bg="rgba(0,0,0,0.8)">
              <Pressable position="absolute" top={40} right={20} onPress={() => setSelectedImage(null)}>
                <Icon as={X} color="white" size="xl" />
              </Pressable>

              {selectedImage && (
                <VStack alignItems="center">
                  <Image
                    source={{ uri: selectedImage }}
                    width={width * 0.9}
                    height={width * 0.9}
                    borderRadius="$2xl"
                  />
                  <HStack mt="$4" alignItems="center" space="md">
                    <Pressable onPress={() => handleLike(selectedImage)}>
                      <Icon
                        as={Heart}
                        color={likes[selectedImage] ? '#10b981' : '#6b7280'}
                        fill={likes[selectedImage] ? '#10b981' : 'transparent'}
                        size="lg"
                      />
                    </Pressable>
                    <Text color="white" fontSize="$lg" fontWeight="$bold">
                      {Object.values(likes).filter(Boolean).length} Likes Totales
                    </Text>
                  </HStack>
                </VStack>
              )}
            </Box>
          </Modal>

          {/* LOGROS */}
          <Box bg="#2d2d2d" mx="$5" p="$5" borderRadius="$2xl" mb="$8">
            <HStack space="md" alignItems="center" mb="$4">
              <Icon as={Award} color="#10b981" size="xl" />
              <Text color="#10b981" fontSize="$lg" fontWeight="$bold">
                Logros Recientes
              </Text>
            </HStack>
            <VStack space="md">
              {[
                { title: 'Fotografía del Mes', date: 'Noviembre 2024', icon: Star },
                { title: 'Top Contributor', date: 'Octubre 2024', icon: TrendingUp },
                { title: 'Editor Destacado', date: 'Septiembre 2024', icon: Edit },
              ].map((a, i) => (
                <HStack
                  key={i}
                  space="md"
                  alignItems="center"
                  bg="#1a1a1a"
                  p="$3"
                  borderRadius="$xl"
                  borderWidth={1}
                  borderColor="#10b981"
                >
                  <Box bg="#10b981" p="$2" borderRadius="$full">
                    <Icon as={a.icon} color="white" size="md" />
                  </Box>
                  <VStack flex={1}>
                    <Text color="white" fontSize="$sm" fontWeight="$semibold">
                      {a.title}
                    </Text>
                    <Text color="#6b7280" fontSize="$xs">
                      {a.date}
                    </Text>
                  </VStack>
                </HStack>
              ))}
            </VStack>
          </Box>
        </VStack>
      </ScrollView>
    </Box>
  );
}