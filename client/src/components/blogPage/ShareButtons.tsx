import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from 'react-share';
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { Button } from '../Button';
import { buttonStyles } from '@/utils/buttonStyles';

const ShareButtons = ({ url }: { url: string }) => {
  return (
    <div className="flex flex-col justify-starts items-start gap-5">
      <FacebookShareButton url={url}>
        <Button className={buttonStyles('btn-ghost')}>
          <FaFacebookF className="mr-2" />
          Facebook
        </Button>
      </FacebookShareButton>

      <LinkedinShareButton url={url}>
        <Button className={buttonStyles('btn-ghost')}>
          <FaLinkedinIn className="mr-2" />
          LinkedIn
        </Button>
      </LinkedinShareButton>

      <WhatsappShareButton url={url}>
        <Button className={buttonStyles('btn-ghost')}>
          <FaWhatsapp className="mr-2" />
          Whatsapp
        </Button>
      </WhatsappShareButton>
    </div>
  );
};

export default ShareButtons;
