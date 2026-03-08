import { MapEntityDTO } from "../types/mapEntity.dto";

const mapEntitiesMock: MapEntityDTO[] = [
  {
    type: "POI",
    id: "poi-1",
    name: "Taquería El Chapo",
    category: "restaurant",
    lat: 25.566519,
    lng: -108.48573,
  },
  {
    type: "POI",
    id: "poi-2",
    name: "Uadeo",
    category: "school",
    lat: 25.568081,
    lng: -108.486474,
  },
  {
    type: "POI",
    id: "poi-3",
    name: "Uadeo 2",
    category: "school",
    lat: 25.568081,
    lng: -108.496474,
  },
  {
    type: "STOP",
    id: "stop-1",
    name: "UadeO",
    lat: 25.56692,
    lng: -108.486458,
  },
  {
    type: "STOP",
    id: "stop-2",
    name: "UadeO2",
    lat: 25.566719,
    lng: -108.486492,
  },
];

export default mapEntitiesMock;
