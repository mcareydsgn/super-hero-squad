
import {atom, computed, type ReadableAtom} from 'nanostores';

import MissionJSON from "./assets/missions.json";

export const $allMissions = atom(MissionJSON);