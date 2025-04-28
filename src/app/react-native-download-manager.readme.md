

Android :
    DownloadManager : (Android Native class to download)
        - The download manager is a system service that handles long-running HTTP downloads. Clients may request that a URI be downloaded to a particular destination file. The download manager will conduct the download in the background, taking care of HTTP interactions and retrying downloads after failures or across connectivity changes and system reboots.

        - Apps that request downloads through this API should register a broadcast receiver for ACTION_NOTIFICATION_CLICKED to appropriately handle when the user clicks on a running download in a notification or from the downloads UI.