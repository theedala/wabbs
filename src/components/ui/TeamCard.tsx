import { ProfileCard } from "@/components/reactbits/ProfileCard";

export function TeamCard({ member }: { member: { name: string; role: string; photo: string } }) {
  return <ProfileCard name={member.name} role={member.role} imageUrl={member.photo} />;
}
