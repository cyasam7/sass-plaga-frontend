import { AxiosFetcher } from '../fetcher';

export interface Membership {
  id: string;
  tenantId: string;
  dueDate: Date;
  type: EMembershipType;
}

export enum EMembershipType {
  MONTHLY = 'monthly',
  YEARLY = 'yearly'
}

export interface IDataGridMembership {
  id: string;
  tenantId: string;
  tenantName: string;
  dueDate: Date;
  type: EMembershipType;
  ownerId: string;
  owner: string;
  ownerEmail: string;
}

export class CreateMembershipDTO {
  name: string;
  phone: string;
  email: string;
  password: string;
  workspaceName: string;
  companyName: string;
  membershipType: EMembershipType;
  dueDate: Date;
}

export class MembershipService {
  private static readonly baseUrl = 'membership';

  static async getAll(): Promise<IDataGridMembership[]> {
    return AxiosFetcher<IDataGridMembership[]>({
      url: `${this.baseUrl}`,
      method: 'GET'
    });
  }

  static async getById(id: string): Promise<Membership> {
    return AxiosFetcher<Membership>({
      url: `${this.baseUrl}/${id}`,
      method: 'GET'
    });
  }

  static async create(membership: CreateMembershipDTO): Promise<void> {
    AxiosFetcher({
      url: this.baseUrl,
      method: 'POST',
      data: membership
    });
  }
}
