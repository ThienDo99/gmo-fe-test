import * as styles from "../styles/AdvertisementCard.css";
interface AlternativeSlugs {
  en: string;
  es: string;
  ja: string;
  fr: string;
  it: string;
  ko: string;
  de: string;
  pt: string;
}

interface Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
}

interface Links {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

interface TopicSubmission {
  status: string;
  approved_on: string;
}

interface TopicSubmissions {
  "street-photography"?: TopicSubmission;
}

interface ProfileImage {
  small: string;
  medium: string;
  large: string;
}

interface Social {
  instagram_username: string | null;
  portfolio_url: string;
  twitter_username: string | null;
  paypal_email: string | null;
}

interface User {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  twitter_username: string | null;
  portfolio_url: string;
  bio: string;
  location: string;
  links: Links;
  profile_image: ProfileImage;
  instagram_username: string | null;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  total_promoted_photos: number;
  total_illustrations: number;
  total_promoted_illustrations: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: Social;
}

export interface UnsplashPhoto {
  id: string;
  slug: string;
  alternative_slugs: AlternativeSlugs;
  created_at: string;
  updated_at: string;
  promoted_at: string | null;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string | null;
  alt_description: string;
  breadcrumbs: any[];
  urls: Urls;
  links: Links;
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  sponsorship: any | null;
  topic_submissions: TopicSubmissions;
  asset_type: string;
  user: User;
  isLoading?: boolean;
  onClick: () => void;
}

export const AdvertisementCard = ({
  urls,
  alt_description,
  isLoading,
  onClick,
  height = 150,
  slug,
}: Partial<UnsplashPhoto>) => {
  return (
    <div
      className={`${styles.card} ${
        isLoading ? styles.loadingCard : styles.loadedCard
      }`}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={() => {}}
      style={{
        gridRowEnd: `span ${Math.ceil(height / 10)}`,
      }}
    >
      <div className={styles.slugLabel}>{slug}</div>
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
        </div>
      ) : (
        <img src={urls?.thumb} alt={alt_description} className={styles.image} />
      )}
    </div>
  );
};
