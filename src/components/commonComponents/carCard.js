import { Card, Image, Text, Group, Badge, createStyles, Center, Button, Box, useMantineTheme, Flex } from '@mantine/core';
import { IconGasStation, IconGauge, IconManualGearbox, IconUsers } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    boxShadow: '0  5px 10px rgba(154,160,185,0.05), 0 15px 40px rgba(166,173,201,0.2)'
  },

  imageSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    color: theme.colors.blue[7] + '!important',
    textTransform: 'uppercase',
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  icon: {
    marginRight: '5px',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[5],
  },
}));

const mockdata = [
  { label: '4 passengers', icon: IconUsers },
  { label: '100 km/h in 4 seconds', icon: IconGauge },
  { label: 'Automatic gearbox', icon: IconManualGearbox },
  { label: 'Electric', icon: IconGasStation },
];

export default function CarCard({car}) {
  const theme = useMantineTheme()
  const navigate = useNavigate()
  const { classes } = useStyles();
  const features = mockdata.map((feature) => (
    <Center key={feature.label}>
      <feature.icon size="1.05rem" className={classes.icon} stroke={1.5} />
      <Text size="xs">{feature.label}</Text>
    </Center>
  ));

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image src={car.image} alt="Car Image" height={200} />
      </Card.Section>

      <Box position="apart" mt="md">
        <Flex justify={'space-between'}>
          <Text fw={500}>{car.name}</Text>
          <Badge variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>NEW</Badge>
        </Flex>
        <Text fz="xs" c="dimmed" mt={4}>
          {car.description}
          </Text>
      </Box>

      <Card.Section className={classes.section} mt="md">
        <Text fz="sm" c="dimmed" className={classes.label}>
          Basic configuration
        </Text>

        <Group spacing={8} mb={-8}>
          {features}
        </Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group spacing={30}>
          <div>
            <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
              {'Rs. ' + car.price}
            </Text>
            <Text fz="sm" c="dimmed" fw={500} sx={{ lineHeight: 1 }} mt={3}>
              per car
            </Text>
          </div>

          <Button onClick={() => navigate('/customer/orderNow', {state: {car: car}})} radius="md" style={{ flex: 1, backgroundColor: theme.colors.blue[7] }}>
            ORDER NOW
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
}