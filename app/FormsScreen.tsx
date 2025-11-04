import React, { useState } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { 
  Box, 
  Text, 
  VStack, 
  HStack,
  Checkbox,
  CheckboxGroup,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
  Link,
  LinkText,
  Icon,
  Pressable,
  Radio,
  RadioGroup,
  RadioIndicator,
  RadioIcon,
  RadioLabel,
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Switch,
  Textarea,
  TextareaInput,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
} from '@gluestack-ui/themed';
import { 
  CheckIcon, 
  ChevronDownIcon, 
  ExternalLinkIcon, 
  CircleIcon,
  CheckSquare,
  Link2,
  Hand,
  CircleDot,
  List,
  Gauge,
  ToggleRight,
  FileText
} from 'lucide-react-native';

export default function FormsScreen() {
  const [checkboxValues, setCheckboxValues] = useState([]);
  const [pressableColor, setPressableColor] = useState('white');
  const [pressablePressed, setPressablePressed] = useState(false);
  const [radioValue, setRadioValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [sliderValue, setSliderValue] = useState(50);
  const [switchValue, setSwitchValue] = useState(false);
  const [textareaValue, setTextareaValue] = useState('');

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1, backgroundColor: '#1a1a1a' }} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <VStack space="lg" p="$4" pb="$8">
          
          {/* Header de la sección */}
          <Box 
            bg="linear-gradient(135deg, #10b981 0%, #059669 100%)"
            p="$5" 
            borderRadius="$2xl"
            mt="$2"
          >
            <HStack space="md" alignItems="center">
              <Box bg="rgba(255,255,255,0.2)" p="$3" borderRadius="$full">
                <Icon as={FileText} color="white" size="xl" />
              </Box>
              <VStack flex={1}>
                <Text color="white" fontSize="$2xl" fontWeight="$bold">
                  Formularios
                </Text>
                <Text color="#fff" fontSize="$sm">
                  Todos los componentes de Gluestack UI
                </Text>
              </VStack>
            </HStack>
          </Box>
          
          {/* CHECKBOX GROUP */}
          <Box 
            bg="#2d2d2d" 
            p="$5" 
            borderRadius="$2xl" 
            borderWidth={2} 
            borderColor="#10b981"
            shadowColor="#10b981"
            shadowOffset={{ width: 0, height: 4 }}
            shadowOpacity={0.3}
            shadowRadius={8}
          >
            <HStack space="md" alignItems="center" mb="$4">
              <Icon as={CheckSquare} color="#10b981" size="xl" />
              <Text color="#10b981" fontSize="$xl" fontWeight="$bold">
                Checkbox Group
              </Text>
            </HStack>
            <CheckboxGroup value={checkboxValues} onChange={setCheckboxValues}>
              <VStack space="lg">
                <Checkbox value="option1" size="lg">
                  <CheckboxIndicator mr="$3" borderColor="#10b981" borderWidth={2}>
                    <CheckboxIcon as={CheckIcon} color="#fff" />
                  </CheckboxIndicator>
                  <CheckboxLabel color="white" fontSize="$md">Opción 1 - Primera elección</CheckboxLabel>
                </Checkbox>
                <Checkbox value="option2" size="lg">
                  <CheckboxIndicator mr="$3" borderColor="#10b981" borderWidth={2}>
                    <CheckboxIcon as={CheckIcon} color="#fff" />
                  </CheckboxIndicator>
                  <CheckboxLabel color="white" fontSize="$md">Opción 2 - Segunda elección</CheckboxLabel>
                </Checkbox>
                <Checkbox value="option3" size="lg">
                  <CheckboxIndicator mr="$3" borderColor="#10b981" borderWidth={2}>
                    <CheckboxIcon as={CheckIcon} color="#fff" />
                  </CheckboxIndicator>
                  <CheckboxLabel color="white" fontSize="$md">Opción 3 - Tercera elección</CheckboxLabel>
                </Checkbox>
              </VStack>
            </CheckboxGroup>
            <Text color="#00ffaaff" fontSize="$sm" mt="$4">
              Seleccionados: {checkboxValues.length} de 3
            </Text>
          </Box>

          {/* LINK WITH ICON */}
          <Box 
            bg="#2d2d2d" 
            p="$5" 
            borderRadius="$2xl"
            borderWidth={1}
            borderColor="#3d3d3d"
          >
            <HStack space="md" alignItems="center" mb="$4">
              <Icon as={Link2} color="#10b981" size="xl" />
              <Text color="#10b981" fontSize="$xl" fontWeight="$bold">
                Link con Icono
              </Text>
            </HStack>
            <Link href="https://gluestack.io" isExternal>
              <Box 
                bg="#1a1a1a" 
                p="$4" 
                borderRadius="$xl"
                borderWidth={1}
                borderColor="#10b981"
              >
                <HStack space="md" alignItems="center" justifyContent="space-between">
                  <VStack flex={1}>
                    <LinkText color="#10b981" fontSize="$lg" fontWeight="$semibold">
                      Visitar Gluestack UI
                    </LinkText>
                    <Text color="#fff" fontSize="$xs" mt="$1">
                      https://gluestack.io
                    </Text>
                  </VStack>
                  <Icon as={ExternalLinkIcon} color="#10b981" size="lg" />
                </HStack>
              </Box>
            </Link>
          </Box>

          {/* PRESSABLE */}
          <Box 
            bg="#2d2d2d" 
            p="$5" 
            borderRadius="$2xl"
            borderWidth={1}
            borderColor="#3d3d3d"
          >
            <HStack space="md" alignItems="center" mb="$4">
              <Icon as={Hand} color="#10b981" size="xl" />
              <Text color="#10b981" fontSize="$xl" fontWeight="$bold">
                Pressable Interactivo
              </Text>
            </HStack>
            <Pressable
              onPressIn={() => {
                setPressableColor('#fff');
                setPressablePressed(true);
              }}
              onPressOut={() => {
                setPressableColor('#fff');
                setPressablePressed(false);
              }}
              bg={pressablePressed ? '#10b981' : '#1a1a1a'}
              p="$5"
              borderRadius="$xl"
              borderWidth={2}
              borderColor="#10b981"
            >
              <VStack space="sm" alignItems="center">
                <Icon 
                  as={Hand} 
                  color={pressableColor} 
                  size="xl" 
                />
                <Text 
                  color={pressableColor} 
                  fontSize="$lg" 
                  fontWeight="$bold"
                  textAlign="center"
                >
                  {pressablePressed ? '¡Presionado!' : 'Presiona aquí'}
                </Text>
                <Text 
                  color={pressablePressed ? '#fff' : '#00ffaaff'} 
                  fontSize="$sm"
                  textAlign="center"
                >
                  {pressablePressed ? 'Suelta para quitar el efecto' : 'Mantén presionado para ver el efecto'}
                </Text>
              </VStack>
            </Pressable>
          </Box>

          {/* RADIO GROUP */}
          <Box 
            bg="#2d2d2d" 
            p="$5" 
            borderRadius="$2xl" 
            borderWidth={2} 
            borderColor="#10b981"
            shadowColor="#10b981"
            shadowOffset={{ width: 0, height: 4 }}
            shadowOpacity={0.3}
            shadowRadius={8}
          >
            <FormControl>
              <FormControlLabel mb="$4">
                <HStack space="md" alignItems="center">
                  <Icon as={CircleDot} color="#10b981" size="xl" />
                  <FormControlLabelText color="#10b981" fontSize="$xl" fontWeight="$bold">
                    Radio Group
                  </FormControlLabelText>
                </HStack>
              </FormControlLabel>
              <RadioGroup value={radioValue} onChange={setRadioValue}>
                <VStack space="lg">
                  <Radio value="radio1" size="lg">
                    <RadioIndicator mr="$3" borderColor="#10b981" borderWidth={2}>
                      <RadioIcon as={CircleIcon} color="#fff" />
                    </RadioIndicator>
                    <RadioLabel color="white" fontSize="$md">Radio 1 - Opción única</RadioLabel>
                  </Radio>
                  <Radio value="radio2" size="lg">
                    <RadioIndicator mr="$3" borderColor="#10b981" borderWidth={2}>
                      <RadioIcon as={CircleIcon} color="#fff" />
                    </RadioIndicator>
                    <RadioLabel color="white" fontSize="$md">Radio 2 - Alternativa</RadioLabel>
                  </Radio>
                  <Radio value="radio3" size="lg">
                    <RadioIndicator mr="$3" borderColor="#10b981" borderWidth={2}>
                      <RadioIcon as={CircleIcon} color="#fff" />
                    </RadioIndicator>
                    <RadioLabel color="white" fontSize="$md">Radio 3 - Otra opción</RadioLabel>
                  </Radio>
                </VStack>
              </RadioGroup>
              <FormControlHelper mt="$3">
                <FormControlHelperText color="#00ffaaff" fontSize="$sm">
                  Selección actual: {radioValue || 'Ninguna'}
                </FormControlHelperText>
              </FormControlHelper>
            </FormControl>
          </Box>

          {/* SELECT */}
          <Box
            bg="#2d2d2d"
            p="$5"
            borderRadius="$2xl"
            borderWidth={1}
            borderColor="#3d3d3d"
          >
            <FormControl>
              <FormControlLabel mb="$4">
                <HStack space="md" alignItems="center">
                  <Icon as={List} color="#10b981" size="xl" />
                  <FormControlLabelText color="#10b981" fontSize="$xl" fontWeight="$bold">
                    Select Form Control
                  </FormControlLabelText>
                </HStack>
              </FormControlLabel>

              <Select selectedValue={selectValue} onValueChange={setSelectValue}>
                <SelectTrigger
                  variant="outline"
                  size="lg"
                  borderColor="#10b981"
                  borderWidth={2}
                  bg="#1a1a1a"
                >
                  <SelectInput
                    placeholder="Selecciona una opción"
                    color="white"
                    fontSize="$md"
                  />
                  <SelectIcon mr="$3" as={ChevronDownIcon} color="#10b981" />
                </SelectTrigger>

                <SelectPortal>
                  <SelectBackdrop />
                  <SelectContent bg="#2b2b2b">
                    <SelectDragIndicatorWrapper>
                      <SelectDragIndicator bg="#10b981" />
                    </SelectDragIndicatorWrapper>

                    {[
                      { label: 'Opción A - Premium', value: 'a' },
                      { label: 'Opción B - Estándar', value: 'b' },
                      { label: 'Opción C - Especial', value: 'c' },
                      { label: 'Opción D - Pro', value: 'd' },
                    ].map((opt) => (
                      <SelectItem
                        key={opt.value}
                        label={opt.label}
                        value={opt.value}
                        _text={{
                          color: selectValue === opt.value ? '#10b981' : 'white',
                          fontWeight: selectValue === opt.value ? 'bold' : 'normal',
                        }}
                        bg={selectValue === opt.value ? '#10b981' : '#2b2b2b'}
                        _pressed={{
                          bg: '#3d3d3d',
                        }}
                      />
                    ))}
                  </SelectContent>
                </SelectPortal>
              </Select>

              <FormControlHelper mt="$3">
                <FormControlHelperText color="#00ffaaff" fontSize="$sm">
                  {selectValue
                    ? `Seleccionado: Opción ${selectValue.toUpperCase()}`
                    : 'Ninguna opción seleccionada'}
                </FormControlHelperText>
              </FormControlHelper>
            </FormControl>
          </Box>

          {/* SLIDER */}
          <Box 
            bg="#2d2d2d" 
            p="$5" 
            borderRadius="$2xl" 
            borderWidth={2} 
            borderColor="#10b981"
            shadowColor="#10b981"
            shadowOffset={{ width: 0, height: 4 }}
            shadowOpacity={0.3}
            shadowRadius={8}
          >
            <HStack space="md" alignItems="center" mb="$3">
              <Icon as={Gauge} color="#10b981" size="xl" />
              <Text color="#10b981" fontSize="$xl" fontWeight="$bold">
                Slider (Min: 0, Max: 100)
              </Text>
            </HStack>
            <Box 
              bg="#1a1a1a" 
              p="$4" 
              borderRadius="$xl" 
              mb="$4"
              borderWidth={1}
              borderColor="#10b981"
            >
              <HStack justifyContent="space-between" alignItems="center">
                <Text color="white" fontSize="$3xl" fontWeight="$bold">
                  {sliderValue}
                </Text>
                <VStack alignItems="flex-end">
                  <Text color="#fff" fontSize="$sm">
                    Porcentaje
                  </Text>
                  <Text color="#00ffaaff" fontSize="$md" fontWeight="$semibold">
                    {sliderValue}%
                  </Text>
                </VStack>
              </HStack>
            </Box>
            <Slider
              value={sliderValue}
              onChange={setSliderValue}
              minValue={0}
              maxValue={100}
              step={1}
              size="lg"
            >
              <SliderTrack bg="#1a1a1a" h={8}>
                <SliderFilledTrack bg="#10b981" />
              </SliderTrack>
              <SliderThumb bg="#10b981" w={24} h={24} borderWidth={3} borderColor="white" />
            </Slider>
            <HStack justifyContent="space-between" mt="$2">
              <Text color="#fff" fontSize="$xs">0</Text>
              <Text color="#fff" fontSize="$xs">50</Text>
              <Text color="#fff" fontSize="$xs">100</Text>
            </HStack>
          </Box>

          {/* SWITCH */}
          <Box 
            bg="#2d2d2d" 
            p="$5" 
            borderRadius="$2xl"
            borderWidth={1}
            borderColor="#3d3d3d"
          >
            <HStack space="lg" alignItems="center" justifyContent="space-between">
              <HStack space="md" alignItems="center" flex={1}>
                <Icon as={ToggleRight} color="#10b981" size="xl" />
                <VStack flex={1}>
                  <Text color="#10b981" fontSize="$xl" fontWeight="$bold">
                    Switch - Checked State
                  </Text>
                  <Box 
                    bg={switchValue ? '#10b981' : '#1a1a1a'} 
                    px="$3" 
                    py="$1" 
                    borderRadius="$full"
                    mt="$2"
                    alignSelf="flex-start"
                  >
                    <Text 
                      color="white" 
                      fontSize="$xs" 
                      fontWeight="$bold"
                    >
                      {switchValue ? '✓ ACTIVADO' : '✗ DESACTIVADO'}
                    </Text>
                  </Box>
                </VStack>
              </HStack>
              <Switch
                value={switchValue}
                onValueChange={setSwitchValue}
                size="lg"
                trackColor={{ false: '#1a1a1a', true: '#10b981' }}
                thumbColor={switchValue ? 'white' : '#6b7280'}
              />
            </HStack>
          </Box>

          {/* TEXTAREA */}
          <Box 
            bg="#2d2d2d" 
            p="$5" 
            borderRadius="$2xl" 
            borderWidth={2} 
            borderColor="#10b981"
            shadowColor="#10b981"
            shadowOffset={{ width: 0, height: 4 }}
            shadowOpacity={0.3}
            shadowRadius={8}
          >
            <FormControl>
              <FormControlLabel mb="$4">
                <HStack space="md" alignItems="center">
                  <Icon as={FileText} color="#10b981" size="xl" />
                  <FormControlLabelText color="#10b981" fontSize="$xl" fontWeight="$bold">
                    TextArea con FormControl
                  </FormControlLabelText>
                </HStack>
              </FormControlLabel>
              <Textarea
                size="lg"
                isReadOnly={false}
                isInvalid={false}
                isDisabled={false}
                bg="#1a1a1a"
                borderColor="#10b981"
                borderWidth={2}
              >
                <TextareaInput
                  placeholder="Escribe aquí tus comentarios, sugerencias o cualquier información adicional..."
                  value={textareaValue}
                  onChangeText={setTextareaValue}
                  color="white"
                  placeholderTextColor="#fff"
                  numberOfLines={6}
                  fontSize="$md"
                  multiline={true}
                  textAlignVertical="top"
                />
              </Textarea>
              <FormControlHelper mt="$3">
                <FormControlHelperText color="#fff" fontSize="$sm">
                  Caracteres: {textareaValue.length} / 500
                </FormControlHelperText>
              </FormControlHelper>
            </FormControl>
          </Box>

        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}