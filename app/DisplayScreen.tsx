import React, { useState } from 'react';
import { ScrollView, Dimensions, Modal } from 'react-native';
import { 
  Box, 
  Text, 
  VStack, 
  HStack,
  Image,
  Card,
  Badge,
  BadgeText,
  BadgeIcon,
  Button,
  ButtonText,
  ButtonIcon,
  Icon,
  Heading,
  useToast,
  Toast,
  ToastTitle,
  ToastDescription,
  Pressable,
  Divider,
} from '@gluestack-ui/themed';
import { 
  ShoppingCart, 
  Heart,
  AlertCircle,
  CheckCircle,
  Package,
  Trash2,
  Plus,
  Minus,
  TrendingUp,
  X
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  soldOut: boolean;
  inCart: boolean;
  quantity: number;
}

export default function DisplayScreen() {
  const toast = useToast();
  
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      category: 'Smartphone',
      price: 999,
      image: 'https://images.unsplash.com/photo-1592286927505-1e718f1f9616?w=400',
      soldOut: false,
      inCart: false,
      quantity: 0,
    },
    {
      id: 2,
      name: 'MacBook Pro M3',
      category: 'Laptop',
      price: 2499,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
      soldOut: false,
      inCart: false,
      quantity: 0,
    },
    {
      id: 3,
      name: 'AirPods Max',
      category: 'Audio',
      price: 549,
      image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=400',
      soldOut: true,
      inCart: false,
      quantity: 0,
    },
    {
      id: 4,
      name: 'Apple Watch Ultra',
      category: 'Wearable',
      price: 799,
      image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400',
      soldOut: false,
      inCart: false,
      quantity: 0,
    },
    {
      id: 5,
      name: 'iPad Pro 12.9"',
      category: 'Tablet',
      price: 1099,
      image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400',
      soldOut: true,
      inCart: false,
      quantity: 0,
    },
  ]);

  const [favorites, setFavorites] = useState<number[]>([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);

  // Toggle favoritos con corazón
  const toggleFavorite = (productId: number) => {
    const product = products.find(p => p.id === productId);
    
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
      showToast(
        'info',
        'Removido de favoritos',
        `${product?.name} se quitó de tus favoritos`,
        Heart
      );
    } else {
      setFavorites([...favorites, productId]);
      showToast(
        'success',
        '¡Agregado a favoritos!',
        `${product?.name} ahora es uno de tus favoritos`,
        Heart
      );
    }
  };

  // Agregar al carrito con Toast
  const addToCart = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (!product || product.soldOut) return;

    setProducts(products.map(p => 
      p.id === productId ? { ...p, inCart: true, quantity: 1 } : p
    ));

    showToast(
      'success',
      '¡Producto agregado!',
      `${product.name} se agregó al carrito exitosamente`,
      CheckCircle
    );
  };

  // Incrementar cantidad
  const incrementQuantity = (productId: number) => {
    setProducts(products.map(p => 
      p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
    ));
  };

  // Decrementar cantidad
  const decrementQuantity = (productId: number) => {
    setProducts(products.map(p => 
      p.id === productId ? { ...p, quantity: Math.max(1, p.quantity - 1) } : p
    ));
  };

  // Remover del carrito
  const removeFromCart = (productId: number) => {
    const product = products.find(p => p.id === productId);
    setProducts(products.map(p => 
      p.id === productId ? { ...p, inCart: false, quantity: 0 } : p
    ));
    
    showToast(
      'warning',
      'Producto removido',
      `${product?.name} se eliminó del carrito`,
      Trash2
    );
  };

  // Proceder al pago
  const checkout = () => {
    const itemsCount = products.filter(p => p.inCart).length;
    const total = calculateTotal();
    
    showToast(
      'success',
      '¡Compra exitosa!',
      `${itemsCount} productos por $${total.toFixed(2)} • Gracias por tu compra`,
      CheckCircle
    );

    setTimeout(() => {
      setProducts(products.map(p => ({ ...p, inCart: false, quantity: 0 })));
      setShowCartModal(false);
    }, 2000);
  };

  // Calcular total
  const calculateTotal = () => {
    return products.reduce((sum, p) => sum + (p.inCart ? p.price * p.quantity : 0), 0);
  };

  // Toast personalizado que aparece ABAJO
  const showToast = (
    type: 'success' | 'error' | 'warning' | 'info',
    title: string,
    description: string,
    IconComponent: any
  ) => {
    const colors = {
      success: '#10b981',
      error: '#dc2626',
      warning: '#f59e0b',
      info: '#3b82f6'
    };

    toast.show({
      placement: 'bottom',
      duration: 3000,
      render: ({ id }) => {
        return (
          <Toast 
            nativeID={`toast-${id}`}
            action={type} 
            variant="solid"
            bg={colors[type]}
            mx="$4"
            mb="$4"
            borderRadius="$xl"
          >
            <HStack space="md" alignItems="center" w="$full">
              <Icon as={IconComponent} color="white" size="xl" />
              <VStack flex={1}>
                <ToastTitle color="white" fontSize="$md" fontWeight="$bold">
                  {title}
                </ToastTitle>
                <ToastDescription color="white" fontSize="$sm">
                  {description}
                </ToastDescription>
              </VStack>
            </HStack>
          </Toast>
        );
      },
    });
  };

  const itemsInCart = products.filter(p => p.inCart).length;
  const totalAmount = calculateTotal();
  const favoriteProducts = products.filter(p => favorites.includes(p.id));
  const cartProducts = products.filter(p => p.inCart);

  return (
    <Box flex={1} bg="#1a1a1a">
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space="lg" p="$4" pb="$8">
          
          {/* Header */}
          <Box 
            bg="#2d2d2d" 
            p="$5" 
            borderRadius="$2xl"
            borderWidth={2}
            borderColor="#10b981"
          >
            <HStack space="md" alignItems="center">
              <Box bg="#10b981" p="$3" borderRadius="$full">
                <Icon as={Package} color="white" size="xl" />
              </Box>
              <VStack flex={1}>
                <Heading color="white" size="xl">
                  Tienda de Productos
                </Heading>
                <Text color="#d1d5db" fontSize="$sm">
                  Colección premium de electrónicos
                </Text>
              </VStack>
            </HStack>
          </Box>

          {/* Botones de Acción */}
          <HStack space="md">
            <Button
              flex={1}
              size="lg"
              bg="#10b981"
              borderRadius="$xl"
              onPress={() => setShowCartModal(true)}
            >
              <ButtonIcon as={ShoppingCart} mr="$2" />
              <ButtonText>Ver Carrito</ButtonText>
              {itemsInCart > 0 && (
                <Box 
                  bg="white" 
                  ml="$2" 
                  px="$2" 
                  py="$1" 
                  borderRadius="$full"
                  minWidth={24}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text color="#10b981" fontSize="$xs" fontWeight="$bold">
                    {itemsInCart}
                  </Text>
                </Box>
              )}
            </Button>
            <Button
              flex={1}
              size="lg"
              bg="#1a1a1a"
              borderWidth={2}
              borderColor="#10b981"
              borderRadius="$xl"
              onPress={() => setShowFavoritesModal(true)}
            >
              <ButtonIcon as={Heart} mr="$2" color="#10b981" />
              <ButtonText color="#10b981">Favoritos</ButtonText>
              {favorites.length > 0 && (
                <Box 
                  bg="#10b981" 
                  ml="$2" 
                  px="$2" 
                  py="$1" 
                  borderRadius="$full"
                  minWidth={24}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text color="white" fontSize="$xs" fontWeight="$bold">
                    {favorites.length}
                  </Text>
                </Box>
              )}
            </Button>
          </HStack>

          {/* Card con Tabla de Productos */}
          <Card
            size="lg"
            variant="elevated"
            bg="#2d2d2d"
            borderRadius="$2xl"
            borderWidth={2}
            borderColor="#10b981"
            p="$0"
          >
            <VStack>
              {/* Header de Tabla */}
              <Box bg="#1a1a1a" p="$4" borderTopRadius="$md">
                <HStack space="md" alignItems="center" justifyContent="space-between">
                  <HStack space="sm" alignItems="center">
                    <Icon as={TrendingUp} color="#10b981" size="lg" />
                    <Heading color="#10b981" size="md">
                      Tabla de Productos
                    </Heading>
                  </HStack>
                  <Badge action="success" variant="solid" bg="#10b981">
                    <BadgeText>{products.filter(p => !p.soldOut).length} disponibles</BadgeText>
                  </Badge>
                </HStack>
              </Box>

              {/* Encabezados de Columnas */}
              <Box bg="#252525" px="$4" py="$3">
                <HStack>
                  <Box width={70}>
                    <Text color="#10b981" fontSize="$xs" fontWeight="$bold">
                      IMAGEN
                    </Text>
                  </Box>
                  <Box flex={1}>
                    <Text color="#10b981" fontSize="$xs" fontWeight="$bold">
                      PRODUCTO
                    </Text>
                  </Box>
                  <Box width={90}>
                    <Text color="#10b981" fontSize="$xs" fontWeight="$bold">
                      PRECIO
                    </Text>
                  </Box>
                  <Box width={60}>
                    <Text color="#10b981" fontSize="$xs" fontWeight="$bold" textAlign="center">
                      ST
                    </Text>
                  </Box>
                </HStack>
              </Box>

              {/* Filas de Productos */}
              <VStack>
                {products.map((product, index) => (
                  <Box key={product.id}>
                    <Box 
                      px="$4" 
                      py="$4"
                      bg={index % 2 === 0 ? '#2d2d2d' : '#252525'}
                    >
                      {/* Fila Principal */}
                      <HStack alignItems="center" mb="$3">
                        {/* Imagen */}
                        <Box 
                          width={60} 
                          height={60} 
                          borderRadius="$xl" 
                          overflow="hidden"
                          borderWidth={2}
                          borderColor="#10b981"
                          mr="$3"
                        >
                          <Image
                            source={{ uri: product.image }}
                            alt={product.name}
                            style={{ width: 60, height: 60 }}
                            resizeMode="cover"
                          />
                        </Box>

                        {/* Info del Producto con CORAZÓN */}
                        <VStack flex={1}>
                          <Text color="white" fontSize="$md" fontWeight="$bold">
                            {product.name}
                          </Text>
                          <HStack space="sm" alignItems="center" mt="$1">
                            <Pressable onPress={() => toggleFavorite(product.id)}>
                              <Icon 
                                as={Heart} 
                                color={favorites.includes(product.id) ? '#dc2626' : '#6b7280'} 
                                size="md"
                                fill={favorites.includes(product.id) ? '#dc2626' : 'transparent'}
                              />
                            </Pressable>
                            <Text color="#6b7280" fontSize="$xs">
                              {product.category}
                            </Text>
                          </HStack>
                        </VStack>

                        {/* Precio */}
                        <Box width={90}>
                          <Text color="#10b981" fontSize="$lg" fontWeight="$bold">
                            ${product.price}
                          </Text>
                          {product.inCart && (
                            <Text color="#6b7280" fontSize="$2xs" mt="$1">
                              × {product.quantity}
                            </Text>
                          )}
                        </Box>

                        {/* Status (ST) */}
                        <Box width={60} alignItems="center">
                          {product.soldOut ? (
                            <Badge 
                              action="error" 
                              variant="solid"
                              bg="#dc2626"
                              size="md"
                            >
                              <BadgeIcon as={AlertCircle} mr="$1" />
                              <BadgeText fontSize="$2xs">OUT</BadgeText>
                            </Badge>
                          ) : product.inCart ? (
                            <Icon as={ShoppingCart} color="#10b981" size="xl" />
                          ) : (
                            <Icon as={ShoppingCart} color="#6b7280" size="lg" />
                          )}
                        </Box>
                      </HStack>

                      {/* Controles cuando está en carrito */}
                      {product.inCart && (
                        <VStack space="md">
                          <HStack space="md" alignItems="center">
                            <HStack 
                              bg="#1a1a1a" 
                              borderRadius="$lg"
                              borderWidth={1}
                              borderColor="#10b981"
                            >
                              <Pressable onPress={() => decrementQuantity(product.id)}>
                                <Box px="$4" py="$3">
                                  <Icon as={Minus} color="#10b981" size="sm" />
                                </Box>
                              </Pressable>
                              <Box 
                                px="$5" 
                                justifyContent="center" 
                                borderLeftWidth={1}
                                borderRightWidth={1}
                                borderColor="#10b981"
                              >
                                <Text color="white" fontSize="$lg" fontWeight="$bold">
                                  {product.quantity}
                                </Text>
                              </Box>
                              <Pressable onPress={() => incrementQuantity(product.id)}>
                                <Box px="$4" py="$3">
                                  <Icon as={Plus} color="#10b981" size="sm" />
                                </Box>
                              </Pressable>
                            </HStack>
                            
                            <VStack flex={1}>
                              <Text color="#6b7280" fontSize="$xs">
                                Subtotal
                              </Text>
                              <Text color="white" fontSize="$lg" fontWeight="$bold">
                                ${(product.price * product.quantity).toFixed(2)}
                              </Text>
                            </VStack>

                            <Pressable onPress={() => removeFromCart(product.id)}>
                              <Box bg="#dc2626" p="$3" borderRadius="$lg">
                                <Icon as={Trash2} color="white" size="md" />
                              </Box>
                            </Pressable>
                          </HStack>
                        </VStack>
                      )}

                      {/* Botón Add to Cart */}
                      {!product.soldOut && !product.inCart && (
                        <Button
                          size="lg"
                          bg="#10b981"
                          onPress={() => addToCart(product.id)}
                          borderRadius="$xl"
                          mt="$2"
                        >
                          <ButtonIcon as={ShoppingCart} mr="$2" />
                          <ButtonText fontWeight="$bold">Agregar al carrito</ButtonText>
                        </Button>
                      )}
                    </Box>
                    
                    {index < products.length - 1 && (
                      <Divider bg="#3d3d3d" />
                    )}
                  </Box>
                ))}
              </VStack>
            </VStack>
          </Card>

        </VStack>
      </ScrollView>

      {/* MODAL DE CARRITO */}
      <Modal visible={showCartModal} transparent animationType="slide">
        <Box flex={1} bg="rgba(0,0,0,0.5)" justifyContent="flex-end">
          <Box bg="#1a1a1a" borderTopRadius="md" maxHeight="80%">
            <ScrollView showsVerticalScrollIndicator={false}>
              <VStack space="md" p="$5">
                <HStack justifyContent="space-between" alignItems="center" mb="$3">
                  <HStack space="md" alignItems="center">
                    <Icon as={ShoppingCart} color="#10b981" size="xl" />
                    <Heading color="white" size="xl">
                      Mi Carrito
                    </Heading>
                  </HStack>
                  <Pressable onPress={() => setShowCartModal(false)}>
                    <Icon as={X} color="white" size="xl" />
                  </Pressable>
                </HStack>

                {cartProducts.length === 0 ? (
                  <Box py="$10" alignItems="center">
                    <Icon as={ShoppingCart} color="#6b7280" size="md" mb="$3" />
                    <Text color="#6b7280" fontSize="$lg" textAlign="center">
                      Tu carrito está vacío
                    </Text>
                  </Box>
                ) : (
                  <VStack space="md">
                    {cartProducts.map((product) => (
                      <Box 
                        key={product.id} 
                        bg="#2d2d2d" 
                        p="$4" 
                        borderRadius="$xl"
                        borderWidth={1}
                        borderColor="#10b981"
                      >
                        <HStack space="md" alignItems="center" mb="$3">
                          <Image
                            source={{ uri: product.image }}
                            alt={product.name}
                            style={{ width: 60, height: 60 }}
                            borderRadius="$lg"
                          />
                          <VStack flex={1}>
                            <Text color="white" fontSize="$md" fontWeight="$bold">
                              {product.name}
                            </Text>
                            <Text color="#6b7280" fontSize="$xs">
                              {product.category}
                            </Text>
                            <Text color="#10b981" fontSize="$lg" fontWeight="$bold" mt="$1">
                              ${product.price}
                            </Text>
                          </VStack>
                        </HStack>

                        <HStack space="md" alignItems="center">
                          <HStack 
                            bg="#1a1a1a" 
                            borderRadius="$lg"
                            borderWidth={1}
                            borderColor="#10b981"
                          >
                            <Pressable onPress={() => decrementQuantity(product.id)}>
                              <Box px="$3" py="$2">
                                <Icon as={Minus} color="#10b981" size="sm" />
                              </Box>
                            </Pressable>
                            <Box 
                              px="$4" 
                              justifyContent="center" 
                              borderLeftWidth={1}
                              borderRightWidth={1}
                              borderColor="#10b981"
                            >
                              <Text color="white" fontSize="$md" fontWeight="$bold">
                                {product.quantity}
                              </Text>
                            </Box>
                            <Pressable onPress={() => incrementQuantity(product.id)}>
                              <Box px="$3" py="$2">
                                <Icon as={Plus} color="#10b981" size="sm" />
                              </Box>
                            </Pressable>
                          </HStack>
                          
                          <VStack flex={1}>
                            <Text color="#6b7280" fontSize="$xs">
                              Subtotal
                            </Text>
                            <Text color="white" fontSize="$md" fontWeight="$bold">
                              ${(product.price * product.quantity).toFixed(2)}
                            </Text>
                          </VStack>

                          <Pressable onPress={() => removeFromCart(product.id)}>
                            <Box bg="#dc2626" p="$2" borderRadius="$lg">
                              <Icon as={Trash2} color="white" size="md" />
                            </Box>
                          </Pressable>
                        </HStack>
                      </Box>
                    ))}

                    <Divider bg="#3d3d3d" />

                    <HStack justifyContent="space-between" alignItems="center" py="$3">
                      <Text color="white" fontSize="$xl" fontWeight="$bold">
                        Total:
                      </Text>
                      <Text color="#10b981" fontSize="$2xl" fontWeight="$bold">
                        ${totalAmount.toFixed(2)}
                      </Text>
                    </HStack>

                    <Button
                      size="lg"
                      bg="#10b981"
                      borderRadius="$xl"
                      onPress={checkout}
                    >
                      <ButtonIcon as={CheckCircle} mr="$2" />
                      <ButtonText fontSize="$md" fontWeight="$bold">
                        Proceder al Pago ({itemsInCart})
                      </ButtonText>
                    </Button>
                  </VStack>
                )}
              </VStack>
            </ScrollView>
          </Box>
        </Box>
      </Modal>

      {/* MODAL DE FAVORITOS */}
      <Modal visible={showFavoritesModal} transparent animationType="slide">
        <Box flex={1} bg="rgba(0,0,0,0.5)" justifyContent="flex-end">
          <Box bg="#1a1a1a" borderTopRadius="$md" maxHeight="80%">
            <ScrollView showsVerticalScrollIndicator={false}>
              <VStack space="md" p="$5">
                <HStack justifyContent="space-between" alignItems="center" mb="$3">
                  <HStack space="md" alignItems="center">
                    <Icon as={Heart} color="#10b981" size="xl" />
                    <Heading color="white" size="xl">
                      Mis Favoritos
                    </Heading>
                  </HStack>
                  <Pressable onPress={() => setShowFavoritesModal(false)}>
                    <Icon as={X} color="white" size="xl" />
                  </Pressable>
                </HStack>

                {favoriteProducts.length === 0 ? (
                  <Box py="$10" alignItems="center">
                    <Icon as={Heart} color="#6b7280" size="md" mb="$3" />
                    <Text color="#6b7280" fontSize="$lg" textAlign="center">
                      No tienes productos favoritos
                    </Text>
                    <Text color="#6b7280" fontSize="$sm" textAlign="center" mt="$2">
                      Dale ❤️ a tus productos favoritos
                    </Text>
                  </Box>
                ) : (
                  <VStack space="md">
                    {favoriteProducts.map((product) => (
                      <Box 
                        key={product.id} 
                        bg="#2d2d2d" 
                        p="$4" 
                        borderRadius="$xl"
                        borderWidth={1}
                        borderColor="#10b981"
                      >
                        <HStack space="md" alignItems="center">
                          <Image
                            source={{ uri: product.image }}
                            alt={product.name}
                            style={{ width: 80, height: 80 }}
                            borderRadius="$xl"
                          />
                          <VStack flex={1} space="xs">
                            <Text color="white" fontSize="$lg" fontWeight="$bold">
                              {product.name}
                            </Text>
                            <HStack space="xs" alignItems="center">
                              <Icon as={Heart} color="#dc2626" size="sm" fill="#dc2626" />
                              <Text color="#6b7280" fontSize="$xs">
                                {product.category}
                              </Text>
                            </HStack>
                            <Text color="#10b981" fontSize="$xl" fontWeight="$bold">
                              ${product.price}
                            </Text>
                            {product.soldOut && (
                              <Badge action="error" variant="solid" bg="#dc2626" alignSelf="flex-start">
                                <BadgeText fontSize="$xs">Agotado</BadgeText>
                              </Badge>
                            )}
                          </VStack>
                        </HStack>

                        {!product.soldOut && !product.inCart && (
                          <Button
                            size="md"
                            bg="#10b981"
                            borderRadius="$lg"
                            mt="$3"
                            onPress={() => {
                              addToCart(product.id);
                              setShowFavoritesModal(false);
                            }}
                          >
                            <ButtonIcon as={ShoppingCart} mr="$2" />
                            <ButtonText>Agregar al carrito</ButtonText>
                          </Button>
                        )}

                        {product.inCart && (
                          <Box 
                            bg="#10b981" 
                            p="$2" 
                            borderRadius="$lg" 
                            mt="$3"
                            alignItems="center"
                          >
                            <HStack space="xs" alignItems="center">
                              <Icon as={CheckCircle} color="white" size="sm" />
                              <Text color="white" fontSize="$sm" fontWeight="$bold">
                                Ya está en el carrito
                              </Text>
                            </HStack>
                          </Box>
                        )}
                      </Box>
                    ))}
                  </VStack>
                )}
              </VStack>
            </ScrollView>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}