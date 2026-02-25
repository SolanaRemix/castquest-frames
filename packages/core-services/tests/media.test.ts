import { beforeEach, describe, expect, it, vi } from 'vitest';
import { db } from '../src/lib/db';
import { MediaService } from '../src/modules/media/service';

vi.mock('../src/lib/db', () => ({
  db: {
    query: {
      mediaMetadata: {
        findMany: vi.fn(),
        findFirst: vi.fn(),
      },
    },
    select: vi.fn().mockReturnValue({
      from: vi.fn().mockReturnValue({
        where: vi.fn().mockReturnValue({
          orderBy: vi.fn().mockReturnValue({
            limit: vi.fn().mockReturnValue({
              offset: vi.fn().mockResolvedValue([]),
            }),
            offset: vi.fn().mockResolvedValue([]),
          }),
          limit: vi.fn().mockResolvedValue([]),
        }),
        orderBy: vi.fn().mockReturnValue({
          limit: vi.fn().mockReturnValue({
            offset: vi.fn().mockResolvedValue([]),
          }),
        }),
        limit: vi.fn().mockResolvedValue([]),
      }),
    }),
  },
}));

vi.mock('../src/lib/logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));

describe('MediaService', () => {
  let mediaService: MediaService;

  beforeEach(() => {
    mediaService = new MediaService();
    vi.clearAllMocks();
  });

  describe('search', () => {
    it('should return media matching search query', async () => {
      const mockMedia = [
        {
          id: 'media-1',
          mediaId: 'media_001',
          tokenAddress: '0x1111111111111111111111111111111111111111',
          ticker: 'PIC',
          name: 'Epic Sunset',
          mediaType: 'image',
          status: 'active',
          ownerAddress: '0x1234567890123456789012345678901234567890',
          description: 'A beautiful sunset',
          mediaUrl: 'https://example.com/sunset.jpg',
          metadataUri: 'https://example.com/metadata',
          blockNumber: BigInt(1),
          transactionHash: '0xabc',
          riskScore: 0,
          riskFlags: [],
          creatorUserId: null,
          createdAt: new Date(),
        },
      ];

      vi.mocked(db.select).mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            orderBy: vi.fn().mockReturnValue({
              limit: vi.fn().mockReturnValue({
                offset: vi.fn().mockResolvedValue(mockMedia),
              }),
            }),
          }),
        }),
      } as any);

      const result = await mediaService.search('sunset', 20, 0);

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Epic Sunset');
    });

    it('should filter by media type', async () => {
      const mockMedia = [
        {
          id: 'media-1',
          ticker: 'VID',
          name: 'Cool Video',
          mediaType: 'video',
        },
      ];

      vi.mocked(db.select).mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            orderBy: vi.fn().mockReturnValue({
              limit: vi.fn().mockReturnValue({
                offset: vi.fn().mockResolvedValue(mockMedia),
              }),
            }),
          }),
        }),
      } as any);

      const result = await mediaService.list({
        mediaType: 'video',
        limit: 20,
        offset: 0,
      });

      expect(result).toHaveLength(1);
      expect(result[0].mediaType).toBe('video');
    });
  });

  describe('getById', () => {
    it('should return media by ID', async () => {
      const mockMedia = {
        id: 'media-1',
        mediaId: 'media_001',
        tokenAddress: '0x1111111111111111111111111111111111111111',
        ticker: 'PIC',
        name: 'Epic Sunset',
        status: 'active',
        ownerAddress: '0x1234567890123456789012345678901234567890',
        description: 'A beautiful sunset',
        mediaType: 'image',
        mediaUrl: 'https://example.com/sunset.jpg',
        metadataUri: 'https://example.com/metadata',
        blockNumber: BigInt(1),
        transactionHash: '0xabc',
        riskScore: 0,
        riskFlags: [],
        creatorUserId: null,
        createdAt: new Date(),
      };

      vi.mocked(db.select).mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockResolvedValue([mockMedia]),
        }),
      } as any);

      const result = await mediaService.getById('media_001');

      expect(result).toBeDefined();
      expect(result?.name).toBe('Epic Sunset');
    });

    it('should return null for non-existent media', async () => {
      vi.mocked(db.select).mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockResolvedValue([]),
        }),
      } as any);

      const result = await mediaService.getById('nonexistent');

      expect(result).toBeNull();
    });
  });

  describe('getByOwner', () => {
    it('should return all media owned by address', async () => {
      const mockMedia = [
        {
          id: 'media-1',
          mediaId: 'media_001',
          ownerAddress: '0x1234567890123456789012345678901234567890',
          ticker: 'PIC1',
          name: 'Photo 1',
          tokenAddress: '0x1111111111111111111111111111111111111111',
          description: 'First photo',
          mediaType: 'image',
          status: 'active',
          mediaUrl: 'https://example.com/photo1.jpg',
          metadataUri: 'https://example.com/metadata1',
          blockNumber: BigInt(1),
          transactionHash: '0xabc1',
          riskScore: 0,
          riskFlags: [],
          creatorUserId: null,
          createdAt: new Date(),
        },
        {
          id: 'media-2',
          mediaId: 'media_002',
          ownerAddress: '0x1234567890123456789012345678901234567890',
          ticker: 'PIC2',
          name: 'Photo 2',
          tokenAddress: '0x2222222222222222222222222222222222222222',
          description: 'Second photo',
          mediaType: 'image',
          status: 'active',
          mediaUrl: 'https://example.com/photo2.jpg',
          metadataUri: 'https://example.com/metadata2',
          blockNumber: BigInt(2),
          transactionHash: '0xabc2',
          riskScore: 0,
          riskFlags: [],
          creatorUserId: null,
          createdAt: new Date(),
        },
      ];

      vi.mocked(db.select).mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            orderBy: vi.fn().mockReturnValue({
              limit: vi.fn().mockReturnValue({
                offset: vi.fn().mockResolvedValue(mockMedia),
              }),
            }),
          }),
        }),
      } as any);

      const result = await mediaService.getByOwner('0x1234567890123456789012345678901234567890');

      expect(result).toHaveLength(2);
    });
  });
});
