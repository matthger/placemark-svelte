import { LatLng } from "leaflet";
import type { Placemark } from "./placemark-types";
import type { MarkerLayer, MarkerSpec } from "./markers";

export function getMarkerLayer(title: string, placemarks: Placemark[]): MarkerLayer {
    const markerSpecs = Array<MarkerSpec>();
    placemarks.forEach((placemark) => {
        markerSpecs.push({
            id: placemark._id,
            title: `${placemark.name} (${placemark.category.name})`,
            location: new LatLng(placemark.lat, placemark.lng),
            popup: true
        });
    });
    return { title: title, markerSpecs: markerSpecs };
}
