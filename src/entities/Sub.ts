import {
  Entity as TOENTITY,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import Entity from "./Entity";
import Post from "./Post";
import User from "./User";

@TOENTITY("subs")
export default class Sub extends Entity {
  constructor(sub: Partial<Sub>) {
    super();
    Object.assign(this, sub);
  }

  @Index()
  @Column({ unique: true })
  name: string;

  @Column()
  title: String;

  @Column({ type: "text", nullable: true })
  description: String;

  @Column({ nullable: true })
  imageUrn: String;

  @Column({ nullable: true })
  bannerUrn: String;

  @ManyToOne(() => User)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  @OneToMany(() => Post, (post) => post.subName)
  posts: Post[];
}
