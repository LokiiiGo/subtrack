import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';

export function getServiceIcon(serviceName, size = 40) {
  const name = serviceName.toLowerCase();

  /* Streamings */
  if (name.includes('youtube')) {
    return <Icon name="youtube" size={size} color="#FF0000" />;
  }
  if (name.includes('spotify')) {
    return <Icon name="spotify" size={size} color="#1DB954" />;
  }
  if (name.includes('amazon')) {
    return <Icon name="amazon" size={size} color="#FF9900" />;
  }
  if (name.includes('disney+')) {
    return <Icon name="star" size={size} color="#1E40AF" />;
  }
  if (name.includes('netflix')) {
    return <MaterialCommunityIcons name="netflix" size={size} color="#E50914" />;
  }

  /* Software */
  if (name.includes('adobe')) {
    return <MaterialIcons name="adobe" size={size} color="#f92d2d" />
  }
  if (name.includes('discord')) {
    return <MaterialIcons name="discord" size={size} color="#5865F2" />;
  }
  if (name.includes('google')) {
    return <MaterialCommunityIcons name="google-play" size={size} color="#00d064" />
  }
  if (name.includes('microsoft')) {
    return <MaterialCommunityIcons name="microsoft" size={size} color="#0089ae" />
  }

  /* Games */
  if (name.includes('steam')) {
    return <FontAwesome name="steam" size={size} color="#fff" />
  }
  if (name.includes('xbox')) {
    return <MaterialCommunityIcons name="microsoft-xbox" size={size} color="#00c12a" />
  }
  if (name.includes('playstation')) {
    return <MaterialCommunityIcons name="sony-playstation" size={size} color="#005bdc" />
  }
  if (name.includes('epicgames')) {
    return <FontAwesome name="gamepad" size={size} color="black" />
  }

  // Ícone padrão
  return <Icon name="credit-card" size={size} color="#374151" />;
}
