import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/Button';
import { FaShareAlt } from 'react-icons/fa';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ShareButtons from './ShareButtons';
import { buttonStyles } from '@/utils/buttonStyles';
import { MdContentCopy } from 'react-icons/md';

function Share({ url }: { url: string }) {
  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopyLink = () => {
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className={buttonStyles('btn-ghost')}>
          <FaShareAlt size={20} className="mr-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-8 bg-bgCard text-textSecondary flex flex-col items-start gap-5">
        <ShareButtons url={url} />
        <CopyToClipboard text={url} onCopy={handleCopyLink}>
          <Button className={buttonStyles('btn-ghost')}>
            <MdContentCopy size={16} className="mr-2" />
            {linkCopied ? 'Link Copied!' : 'Copy Link'}
          </Button>
        </CopyToClipboard>
      </PopoverContent>
    </Popover>
  );
}

export default Share;
