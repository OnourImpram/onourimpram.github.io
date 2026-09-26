export type RoomFitResult={fits:boolean;widthClearance:number;depthClearance:number;footprintWidth:number;footprintDepth:number;roomWidth:number;roomDepth:number};
const n=(v:number)=>Math.round(v*10)/10;
export function evaluateRoomFit(roomWidth:number,roomDepth:number,footprint:{width:number;depth:number}):RoomFitResult|null{
 if(!Number.isFinite(roomWidth)||!Number.isFinite(roomDepth)||roomWidth<=0||roomDepth<=0||!footprint||!Number.isFinite(footprint.width)||!Number.isFinite(footprint.depth)||footprint.width<=0||footprint.depth<=0)return null;
 const widthClearance=n((roomWidth-footprint.width)/2),depthClearance=n((roomDepth-footprint.depth)/2);
 return {fits:roomWidth>=footprint.width&&roomDepth>=footprint.depth,widthClearance,depthClearance,footprintWidth:n(footprint.width),footprintDepth:n(footprint.depth),roomWidth,roomDepth};
}
